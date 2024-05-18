from typing import List, Optional

from db_logic import PokemonCRUD
from models import Pokemon, OrderBy, FilterBy


class PokedexController:
    def __init__(self, pokemon_crud: PokemonCRUD):
        self._pokemon_crud = pokemon_crud

    def get_all_pokemon(self, order_by: OrderBy, filter_by: Optional[FilterBy] = None) -> List[Pokemon]:
        return self._pokemon_crud.get_all(order_by=order_by, filter_by=filter_by)

    def update_captured_pokemon(self, pokemon_id: int, is_captured: bool) -> None:
        self._pokemon_crud.update(pokemon_id=pokemon_id, is_captured=is_captured)
