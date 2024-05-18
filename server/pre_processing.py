import hashlib
import logging
from abc import ABC, abstractmethod
from typing import Optional, Dict, List, Any

from db_logic import db_get
from models import Pokemon

_logger = logging.getLogger(__name__)


# Interface for Pokémon DB - if in the future the implementation changes, the transition will be transparent
class PokemonDB(ABC):
    @abstractmethod
    def get(self) -> List[Pokemon]:
        pass

    @abstractmethod
    def update_is_captured(self, pokemon_id: int, is_captured: bool) -> None:
        pass

    @abstractmethod
    def reload(self) -> None:
        pass


# We keep this class protected as a singleton so no one will be able to access it
class _PokemonJSONDB(PokemonDB):
    _data: Optional[Dict[int, Pokemon]]

    def __init__(self):
        self._launch()

    def get(self) -> List[Pokemon]:
        return list(self._data.values())

    def update_is_captured(self, pokemon_id: int, is_captured: bool):
        self._data[pokemon_id].is_captured = is_captured

    def _launch(self) -> None:
        _logger.info('Loading DB into memory for the first time')
        try:
            self.reload()
        except Exception:
            _logger.exception('Failed to load DB into memory')
            raise

    def reload(self) -> None:
        _logger.debug('Reloading data into memory from DB')

        # Load data in-memory
        raw_pokemons = db_get()

        self._data = {self._create_pokemon_id(pokemon): Pokemon(
            pokemon_id=self._create_pokemon_id(pokemon),
            icon_url=f"https://img.pokemondb.net/sprites/home/normal",
            **pokemon)
            for pokemon in raw_pokemons}

    def _create_pokemon_id(self, pokemon: Dict[str, Any]) -> int:
        # Creating a persistent id per Pokémon
        return int(hashlib.md5(f"{pokemon['number']}{pokemon['name']}".encode('utf-8')).hexdigest(), 16)


POKEMON_DB = _PokemonJSONDB()
