"use strict";

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { editorName } = require("./editor");
const { preferences, durationSeconds, soundName } = require("./preferences");

function notifierPath() {
  return process.env.PING_ME_PATH ||
    path.join(os.homedir(), "Library/Application Support/PingMeIcon/Ping Me.app/Contents/MacOS/PingMe");
}

function notify(signal) {
  let args;
  try {
    const editor = editorName();
    const config = preferences();
    args = [
      "--title", signal.title,
      "--subtitle", signal.subtitle,
      "--body", signal.body,
      "--identifier", `claude-${signal.sessionId || signal.id}`,
      "--project-path", signal.cwd,
      "--editor", editor,
      "--duration", String(durationSeconds(config.duration)),
      "--sound", soundName(process.env.PING_ME_SOUND ?? config.sound)
    ];
    if (!fs.existsSync(notifierPath())) throw new Error("Popup helper missing. Run /ping-me:init.");
  } catch (error) {
    process.stderr.write(`Ping Me: ${error.message}\n`);
    return false;
  }
  // LaunchServices returns immediately; the popup owns its timer, not the hook.
  const result = process.env.PING_ME_PATH
    ? spawnSync(notifierPath(), args, { encoding: "utf8", timeout: 10000 })
    : spawnSync("/usr/bin/open", ["-g", "-n", "-a", path.resolve(notifierPath(), "../../.."), "--args", ...args],
      { encoding: "utf8", timeout: 10000 });
  if (result.error || result.status !== 0) {
    process.stderr.write(`Ping Me: ${result.error?.message || result.stderr || "notification failed"}\nRun /ping-me:init to check setup.\n`);
    return false;
  }
  return true;
}

module.exports = { notifierPath, notify };
