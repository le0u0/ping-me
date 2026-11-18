# ping-me

A macOS popup when an agent CLI needs input or finishes a response. It works from any terminal; clicking the popup opens the project in VS Code.

Supports Claude Code, Codex and Antigravity.

## Install

<details>
<summary>Claude Code</summary>

```bash
claude plugin marketplace add le0u0/le0u0.ai
claude plugin install ping-me@le0u0.ai
```

</details>

<details>
<summary>Codex</summary>

```bash
codex plugin marketplace add le0u0/le0u0.ai
codex plugin add ping-me@le0u0-ai
```

</details>

<details>
<summary>Antigravity (agy)</summary>

```bash
agy plugin install https://github.com/le0u0/ping-me
```

</details>

## Use

Run `init` to build the popup, choose the editor, duration and sound, send a test, and remove this notifier's old standalone hooks. No macOS notification permission is needed; popups skip Notification Center and ignore Focus.

<details>
<summary>Supported hooks</summary>

| Agent | Supported events |
| --- | --- |
| Claude Code | `PermissionRequest`, `PreToolUse` (`AskUserQuestion`), `Notification` (MCP elicitation), `Stop` |
| Codex | `PermissionRequest`, `PreToolUse` (`request_user_input`), `Stop` |
| Antigravity (`agy`) | `PreToolUse` (`ask_question`), `Stop` |

</details>

Codex question alerts depend on whether the current Codex surface exposes `request_user_input` to tool hooks. Trust the plugin's hooks in Codex before use. Codex plugins with hooks require manual distribution.

### Test without installing the plugin

From this checkout on macOS, build the popup helper with `node src/init.js --icon`, then run `node src/init.js --test`. To test the Codex hook payload directly:

```bash
printf '%s\n' '{"hook_event_name":"Stop","session_id":"test","cwd":"'"$PWD"'"}' | node src/hook.js
```

The popup should say “Response finished”; the command prints `{}`. Replace `Stop` with `PermissionRequest` to test approval alerts. This tests the handler, not Codex hook discovery or trust.

## Skills

| Skill | Does |
| --- | --- |
| `init` | Set up, diagnose, migrate from standalone hooks. |
| `duration` | Seconds a popup stays visible (default 5). |
| `sound` | Pick a macOS sound with preview, or silence. |
| `uninstall` | Remove the helper and saved preferences before deleting the plugin. |

Preferences are saved in `~/.claude/ping-me.json` (or under `CLAUDE_CONFIG_DIR`) and survive updates. `PING_ME_SOUND` overrides the sound; `PING_ME_PATH` points to a custom popup helper.

Already deleted the plugin? Remove what is left by hand:

```bash
rm -rf ~/Library/Application\ Support/PingMeIcon ~/.claude/ping-me.json
```

After an update, run `/ping-me:init` to rebuild the popup.
