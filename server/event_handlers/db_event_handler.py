import logging

from watchdog.events import PatternMatchingEventHandler

from pre_processing import POKEMON_DB

_logger = logging.getLogger(__name__)


class DBFileChangeEventHandler(PatternMatchingEventHandler):
    """
    Watches every change that takes place on the db file. on Every change, reload it into memory
    """
    def __init__(self, patterns):
        super().__init__(patterns=patterns, ignore_directories=True)

    def on_modified(self, event) -> None:
        try:
            POKEMON_DB.reload()
        except Exception:
            _logger.exception('Failed to load new data into memory - using previous data')
