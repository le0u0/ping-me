---
name: sound
description: List, preview, and choose the macOS notification sound for Ping Me, including silence.
---

Open the picker for the user with `--pick`.

1. Run `node "${CLAUDE_PLUGIN_ROOT}/src/preferences.js" --show` and report the saved sound.
   Empty sound means Silent; Glass is the fallback.
2. Run `node "${CLAUDE_PLUGIN_ROOT}/src/preferences.js" --pick`. It opens a Terminal window
   holding the whole list on one screen. Tell the user the controls: Up and Down move the
   highlight and play that sound, Enter saves, Esc cancels. The list opens on the saved
   sound and marks it `(saved)`. It covers the user's own `~/Library/Sounds` as well as
   `/Library/Sounds` and `/System/Library/Sounds`.
3. Wait for the user to say they are done, then run `--show` again and report the saved
   sound. A cancelled picker leaves the previous sound in place; say so.
4. If `--pick` fails, report the error and fall back to flags: `--list-sounds` for the
   names, `--preview "NAME"` to play one, `--sound "NAME"` to save (`Silent` mutes).
   `--choose` needs a real terminal, so run it only inside the picker window.
5. If `PING_ME_SOUND` is set in the Claude process, that environment override wins
   (empty means mute) and changes only after Claude restarts. Leave it in place unless the
   user says to remove it.

Use the exact listed name with proper shell quoting. Report a failed preview, because it
does not prove the user heard audio, and offer another preview. Applies to the next popup.
