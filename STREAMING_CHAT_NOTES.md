# Streaming chat notes

- `streamText` streams the assistant response token by token from Claude through the server route. The client renders only `message.parts` text parts, so incomplete Markdown is not injected as HTML.
- Stop calls the AI SDK `stop` function. Any partial assistant text already received remains in the conversation, the input becomes available again, and a new message can be sent.
- Messages are serialized to `localStorage` under `carealert-report-assistant-messages` and restored when the page refreshes.
- The chat log tracks whether the user is near its bottom. It auto-scrolls only in that state; if the user scrolls upward, new content does not force the viewport down and a “Jump to latest” button appears.
- `ANTHROPIC_API_KEY` is read by the server-side Anthropic provider only. It is not imported into client code, embedded in the UI, or exposed through `NEXT_PUBLIC_*` configuration.

## Manual test checklist

- Send a message and confirm text streams into the assistant response.
- Press Stop during generation and confirm partial text stays visible.
- Send again after stopping.
- Continue for multiple conversation turns.
- Refresh and confirm messages return from localStorage.
- Scroll upward while a response arrives and confirm the viewport is not forced down.
- Test the page at mobile width.
- Confirm an immediate-emergency description receives local emergency-services or qualified-medical-staff guidance.
