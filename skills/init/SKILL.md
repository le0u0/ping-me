---
name: init
description: Set up Ping Me: build the popup, choose the editor, migrate old hooks.
disable-model-invocation: true
---

Keep the working directory at the user's project so the test opens that folder.

1. Check macOS 13+, Node.js 18+, and Apple Command Line Tools (`xcrun --find swiftc`).
   If tools are missing, guide the user through `xcode-select --install` and wait
   for installation. Windows is unsupported.
2. Run `node "${CLAUDE_PLUGIN_ROOT}/src/init.js" --icon` to build or refresh
   `~/Library/Application Support/PingMeIcon/Ping Me.app`.
   Unchanged builds are reused. Then run `node "${CLAUDE_PLUGIN_ROOT}/src/init.js" --check`.
   Report build or check failures.
3. Ask which editor notification clicks should open: Cursor or VS Code, unless the
   user has already chosen. Save with `node "${CLAUDE_PLUGIN_ROOT}/src/init.js" --editor cursor`
   or `--editor vscode`. Confirm the app exists: `test -d /Applications/Cursor.app` or
   `test -d "/Applications/Visual Studio Code.app"` exits 0.
4. Run `node "${CLAUDE_PLUGIN_ROOT}/src/preferences.js" --saved`. It prints only what the
   user has actually chosen, so a missing key is unset rather than deliberate. Settle every
   unset key now.
   - `duration` missing: use this plugin's duration skill to ask how many seconds popups
     stay visible, then save it. Say that 5 is the fallback but still ask.
   - `sound` missing: use this plugin's sound skill so the user picks with the arrow keys
     and hears a preview, then save it. Say that Glass is the fallback but still ask.
   Re-run `--saved` until `editor`, `duration`, and `sound` are all present, then report
   the values.
5. Run `node "${CLAUDE_PLUGIN_ROOT}/src/init.js" --test` once. Ask the user to confirm
   the popup, black icon, expected duration and sound, and that clicking opens this
   project in their selected editor. Respect intentional silence. Investigate failures
   until the user confirms.
6. Once the test succeeds and the plugin is enabled, run
   `node "${CLAUDE_PLUGIN_ROOT}/src/init.js" --migrate`. This backs up settings and
   removes only this notifier's marked standalone hooks, respecting `CLAUDE_CONFIG_DIR`
   and preserving unrelated hooks. Restart Claude Code and verify `/hooks` includes
   PermissionRequest, AskUserQuestion PreToolUse, MCP Notification, and Stop. Ask the user
   to trigger a real question and a completed response: those two popups verify the live
   hooks; the setup popup does not.

## Popup behavior

The custom popup needs no macOS notification permission or alert style. It has no
Notification Center history and ignores Focus. A newer popup replaces the previous one.
Later changes go through `/ping-me:duration` and `/ping-me:sound`. Re-run
init after plugin updates to rebuild the helper.
