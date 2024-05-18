import logging
import os
from logging.handlers import RotatingFileHandler
from pathlib import Path
from typing import Collection


def configure_logger(log_level: str, info_log_file_path: Path, debug_log_file_path: Path, error_log_file_path: Path,
                     info_log_file_max_size: float, logs_file_rotation_number: int, log_format: str,
                     log_date_format: str, logs_directory_path: Path) -> None:
    formatter = logging.Formatter(log_format)
    log_handlers = _create_log_handlers(
        logs_directory_path=logs_directory_path,
        log_level=log_level,
        info_log_file_path=info_log_file_path,
        debug_log_file_path=debug_log_file_path,
        error_log_file_path=error_log_file_path,
        info_log_file_max_size=info_log_file_max_size,
        logs_file_rotation_number=logs_file_rotation_number,
        formatter=formatter
    )

    # noinspection PyTypeChecker
    logging.basicConfig(
        format=log_format,
        datefmt=log_date_format,
        level=logging.DEBUG,
        handlers=log_handlers
    )


def _create_log_handlers(logs_directory_path: Path, log_level: str, info_log_file_path: Path,
                         debug_log_file_path: Path, error_log_file_path: Path, info_log_file_max_size: float,
                         logs_file_rotation_number: int, formatter: logging.Formatter) -> Collection[
    logging.Handler]:

    handlers = []

    general_stream_handler = logging.StreamHandler()
    general_stream_handler.setLevel(log_level)

    create_directory_if_not_exists(logs_directory_path)

    info_file_handler = create_file_handler(
        log_level=logging.INFO,
        log_file_path=info_log_file_path,
        info_log_file_max_size=info_log_file_max_size,
        logs_file_rotation_number=logs_file_rotation_number,
        formatter=formatter,
    )

    debug_file_handler = create_file_handler(
        log_level=logging.DEBUG,
        log_file_path=debug_log_file_path,
        info_log_file_max_size=info_log_file_max_size,
        logs_file_rotation_number=logs_file_rotation_number,
        formatter=formatter,
    )

    error_file_handler = create_file_handler(
        log_level=logging.ERROR,
        log_file_path=error_log_file_path,
        info_log_file_max_size=info_log_file_max_size,
        logs_file_rotation_number=logs_file_rotation_number,
        formatter=formatter,
    )

    handlers.append(general_stream_handler)
    handlers.append(info_file_handler)
    handlers.append(debug_file_handler)
    handlers.append(error_file_handler)

    return handlers


def create_file_handler(log_level: int, log_file_path: Path,
                        info_log_file_max_size: float, logs_file_rotation_number: int,
                        formatter: logging.Formatter) -> RotatingFileHandler:
    # noinspection PyTypeChecker
    handler = RotatingFileHandler(
        filename=log_file_path,
        maxBytes=info_log_file_max_size,
        backupCount=logs_file_rotation_number,
        encoding='utf-8',
    )
    handler.setLevel(log_level)
    handler.setFormatter(formatter)

    return handler


def create_directory_if_not_exists(directory_path: Path) -> None:
    if not os.path.exists(directory_path):
        os.makedirs(directory_path, exist_ok=True)
