import logging
from pathlib import Path

import uvicorn as uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from api_routers import create_pokedex_router
from event_handlers import DBFileChangeEventHandler, DBObserver
from log_config import configure_logger

_logger = logging.getLogger(__name__)
DB_PATH = 'pokemon_db.json'
LOGS_DIR = Path('logs')
PORT = 8080

configure_logger(
    logs_directory_path=LOGS_DIR,
    log_level='INFO',
    info_log_file_path=LOGS_DIR / 'info_log.log',
    info_log_file_max_size=1024 * 1024 * 25,
    debug_log_file_path=LOGS_DIR / 'debug_log.log',
    error_log_file_path=LOGS_DIR / 'error_log.log',
    logs_file_rotation_number=10,
    log_format='%(asctime)s %(msecs)03d %(thread)-8s %(name)-30s - %(levelname)s - %(message)s',
    log_date_format='%d-%b-%y %H:%M:%S',
)


def create_api():
    app = FastAPI()

    app.add_middleware(CORSMiddleware,
                       allow_origins='http://localhost:3000',
                       allow_methods=['*'],
                       allow_headers=['*'])

    # Currently we only have a single router so we will access `/` when the app grows,
    # the router will be accessing something like /pokedex as prefix
    pokedex_router = create_pokedex_router()
    app.include_router(pokedex_router)

    @app.on_event('shutdown')
    def shutdown_event() -> None:
        _logger.info('Server shutting down')

    return app


def launch_db_observer() -> None:
    _logger.info('Launching DB file observer')
    event_handler = DBFileChangeEventHandler(patterns=[DB_PATH])
    observer = DBObserver(event_handler=event_handler, db_path=Path('.'))
    observer.start()


if __name__ == '__main__':
    _logger.info(f'Starting up server [port={PORT}]')
    launch_db_observer()

    poke_app = create_api()
    uvicorn.run(
        app=poke_app,
        port=PORT,
    )
