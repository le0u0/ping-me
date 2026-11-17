#!/usr/bin/env node
"use strict";

const { signalFromHook } = require("./hook-lib");
const { notify } = require("./notifier");

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  input += chunk;
});
process.stdin.on("end", () => {
  let payload;
  try {
    payload = JSON.parse(input);
  } catch {
    process.exitCode = 1;
    return;
  }

  const signal = signalFromHook(payload);
  if (signal) notify(signal);

  if (typeof payload.hookEventName === "string") {
    const response = payload.hookEventName === "PreToolUse" ? { decision: "allow" } : {};
    process.stdout.write(`${JSON.stringify(response)}\n`);
  } else if (payload.hook_event_name === "Stop") {
    process.stdout.write("{}\n");
  }
});
