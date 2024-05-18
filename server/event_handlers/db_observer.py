import threading
from pathlib import Path

from watchdog.observers import Observer

from .db_event_handler import DBFileChangeEventHandler


class DBObserver(threading.Thread):
    """
    Observes DB File in a new thread
    """
    def __init__(self, event_handler: DBFileChangeEventHandler, db_path: Path):
        super().__init__()
        self._observer = Observer()
        self._observer.schedule(event_handler, db_path.as_posix(), recursive=False)

    def run(self) -> None:
        self._observer.start()
