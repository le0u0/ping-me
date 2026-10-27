# ping-me

A macOS popup when Claude Code needs approval, asks a question, wants MCP input, or finishes a response. It works from any terminal; clicking the popup opens the project in Cursor or VS Code.

## Install

```text
/plugin marketplace add le0u0/community
/plugin install ping-me@community
```

Requires macOS 13+, Node.js 18+ and Apple Command Line Tools (`xcode-select --install`).

## Use

```text
/ping-me:init
```

Restart Claude Code first. Init builds the popup, asks for the editor, duration and sound, sends a test, then removes this notifier's old standalone hooks. No macOS notification permission is needed; popups skip Notification Center and ignore Focus.

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
