"use strict";

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { editorName } = require("./editor");
const { preferences, durationSeconds, soundName } = require("./preferences");

function notifierPath() {
  return process.env.AGENT_NOTIFIER_PATH ||
    path.join(os.homedir(), "Library/Application Support/AgentNotifierIcon/Agent Notifier.app/Contents/MacOS/AgentNotifier");
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
      "--sound", soundName(process.env.AGENT_NOTIFIER_SOUND ?? config.sound)
    ];
    if (!fs.existsSync(notifierPath())) throw new Error("Popup helper missing. Run /agent-notifier:init.");
  } catch (error) {
    process.stderr.write(`Agent Notifier: ${error.message}\n`);
    return false;
  }
  // LaunchServices returns immediately; the popup owns its timer, not the hook.
  const result = process.env.AGENT_NOTIFIER_PATH
    ? spawnSync(notifierPath(), args, { encoding: "utf8", timeout: 10000 })
    : spawnSync("/usr/bin/open", ["-g", "-n", "-a", path.resolve(notifierPath(), "../../.."), "--args", ...args],
      { encoding: "utf8", timeout: 10000 });
  if (result.error || result.status !== 0) {
    process.stderr.write(`Agent Notifier: ${result.error?.message || result.stderr || "notification failed"}\nRun /agent-notifier:init to check setup.\n`);
    return false;
  }
  return true;
}

module.exports = { notifierPath, notify };
