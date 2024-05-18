from typing import Optional, List

from models import Pokemon, OrderBy, FilterBy
from pre_processing import PokemonDB


class PokemonCRUD:

    def __init__(self, pokemon_db: PokemonDB):
        self._pokemon_db = pokemon_db

    def get_all(self, order_by: OrderBy, filter_by: Optional[FilterBy] = None) -> List[Pokemon]:
        # Ideally we would make the pagination query here as well, but since we read the data
        # from a preloaded dict, requesting it is fairly quick
        pokemons = self._pokemon_db.get()

        # First we filter and then we sort for better performance
        filtered_pokemon = self._filter_by(pokemons=pokemons, filter_by=filter_by)

        return self._order_by(pokemon=filtered_pokemon, order_by=order_by)

    def update(self, pokemon_id: int, is_captured: bool) -> None:
        self._pokemon_db.update_is_captured(pokemon_id=pokemon_id, is_captured=is_captured)

    @staticmethod
    def _order_by(pokemon: List[Pokemon], order_by: OrderBy) -> List[Pokemon]:
        if order_by == OrderBy.Asc:
            return sorted(pokemon, key=lambda p: p.number)

        return sorted(pokemon, key=lambda p: p.number, reverse=True)

    @staticmethod
    def _filter_by(pokemons: List[Pokemon], filter_by: Optional[FilterBy]) -> List[Pokemon]:
        if filter_by is None:
            return pokemons

        return [pokemon for pokemon in pokemons if filter_by in (pokemon.type_one, pokemon.type_two)]
