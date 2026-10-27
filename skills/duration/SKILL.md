---
name: duration
description: Choose how many seconds Ping Me popups stay visible on macOS; default is 5 seconds.
---

Configure this plugin's custom popup.

1. Run `node "${CLAUDE_PLUGIN_ROOT}/src/preferences.js" --show` and show the current
   duration. The default is 5 seconds.
2. If the user supplied a positive whole number of seconds, use it. Otherwise ask with
   the AskUserQuestion tool so they pick with the arrow keys: `5 seconds (default)`,
   `8 seconds`, `10 seconds`. Its free-text choice accepts any other positive whole
   number. A request to reset means 5. Always let the user choose.
3. Save with `node "${CLAUDE_PLUGIN_ROOT}/src/preferences.js" --duration SECONDS`.
   Run `--show` again to verify the saved value.
4. Run `node "${CLAUDE_PLUGIN_ROOT}/src/init.js" --check`. If the popup helper is
   missing, tell the user to run `/ping-me:init` first. Otherwise run
   `node "${CLAUDE_PLUGIN_ROOT}/src/init.js" --test` once and ask the user to confirm it
   stays visible for the selected duration.

Applies to the next popup. Clicking, closing, or a newer notification dismisses a popup
early.
