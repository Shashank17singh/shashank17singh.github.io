"""
Request handling for the chat API, kept free of Flask and the model so it can be tested.
"""

MAX_MESSAGE_LENGTH = 1000
MAX_HISTORY_CONTENT_LENGTH = 2000
UNAVAILABLE_MESSAGE = "The assistant is temporarily unavailable. Please try again later."


def validate_message(message: object) -> str | None:
    """Return an error for an unusable message, or None if it is fine."""
    if not isinstance(message, str) or not message.strip():
        return "message is required"
    if len(message.strip()) > MAX_MESSAGE_LENGTH:
        return "message too long"
    return None


def build_messages(
    system_prompt: str, context: str, message: str, history: object, max_turns: int
) -> list[dict[str, str]]:
    """Build the model conversation, dropping any history entry that is not well formed."""
    messages = [{"role": "system", "content": f"{system_prompt}\n\nContext:\n{context}"}]
    turns = history[-max_turns:] if isinstance(history, list) else []
    for turn in turns:
        if not isinstance(turn, dict):
            continue
        role, content = turn.get("role"), turn.get("content")
        if role in ("user", "assistant") and isinstance(content, str) and content:
            messages.append({"role": role, "content": content[:MAX_HISTORY_CONTENT_LENGTH]})
    messages.append({"role": "user", "content": message})
    return messages
