from db_logic import PokemonCRUD
from pokedex_controller import PokedexController
from pre_processing import POKEMON_DB


def get_pokedex_controller() -> PokedexController:
    return PokedexController(PokemonCRUD(pokemon_db=POKEMON_DB))
