"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const test = require("node:test");

test("Codex plugin hooks use the bundled handler and return valid responses", () => {
  const root = path.join(__dirname, "..");
  const manifest = require("../.codex-plugin/plugin.json");
  const hooks = JSON.parse(fs.readFileSync(path.join(root, manifest.hooks), "utf8")).hooks;
  for (const [event, tool, expected] of [
    ["Stop", undefined, "Response finished"],
    ["PermissionRequest", "Bash", "Approval required"],
    ["PreToolUse", "request_user_input", "Waiting for your answer"]
  ]) {
    const entry = hooks[event][0];
    if (tool && entry.matcher) assert.match(tool, new RegExp(entry.matcher));
    const command = entry.hooks[0].command;
    assert.equal(command, 'node "${PLUGIN_ROOT}/src/hook.js"');
    const result = spawnSync(process.execPath, [path.join(root, "src/hook.js")], {
      input: JSON.stringify({ hook_event_name: event, tool_name: tool, cwd: "/tmp/project" }),
      encoding: "utf8",
      env: { ...process.env, PING_ME_PATH: "/nonexistent/ping-me-test" }
    });
    assert.equal(result.status, 0);
    assert.match(result.stderr, /Popup helper missing/);
    if (event === "Stop") assert.deepEqual(JSON.parse(result.stdout), {});
    assert.equal(require("../src/hook-lib").notificationFromHook({ hook_event_name: event, tool_name: tool }).body, expected);
  }
});
