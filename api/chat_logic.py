"""
Request handling for the chat API, kept free of Flask and the model so it can be tested.
"""

import threading
import time
from collections import deque

MAX_MESSAGE_LENGTH = 1000
MAX_HISTORY_CONTENT_LENGTH = 2000
UNAVAILABLE_MESSAGE = "The assistant is temporarily unavailable. Please try again later."
BUSY_MESSAGE = "Too many messages, please try again in a minute."


class RateLimiter:
    """Sliding-window limits for one client and for everyone together.

    X-Forwarded-For can be forged, so the client limit is only a courtesy. The overall
    limit is what protects the LLM quota.
    """

    def __init__(self, per_client: int, overall: int, window_seconds: float) -> None:
        self.per_client = per_client
        self.overall = overall
        self.window_seconds = window_seconds
        self._hits: deque[tuple[float, str]] = deque()
        self._lock = threading.Lock()

    def allow(self, client: str, now: float | None = None) -> bool:
        now = time.monotonic() if now is None else now
        with self._lock:
            while self._hits and now - self._hits[0][0] >= self.window_seconds:
                self._hits.popleft()
            if len(self._hits) >= self.overall:
                return False
            if sum(hit == client for _, hit in self._hits) >= self.per_client:
                return False
            self._hits.append((now, client))
            return True


def client_id(forwarded_for: str | None, peer: str | None) -> str:
    """Identify a caller behind a proxy, falling back to the socket's address."""
    return (forwarded_for or "").split(",")[0].strip() or peer or "unknown"


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
