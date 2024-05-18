import logging

from fastapi import APIRouter, Depends, HTTPException
from fastapi import Query, Body
from fastapi_pagination import add_pagination
from fastapi_pagination import paginate, Page

from api_routers.dependencies import get_pokedex_controller
from models import Pokemon, OrderBy, FilterBy
from pokedex_controller import PokedexController

_logger = logging.getLogger(__name__)


def create_pokedex_router() -> APIRouter:
    router = APIRouter()

    @router.get('/get-all', response_model=Page[Pokemon])
    def get_all_pokemon(order_by: OrderBy = Query(default=OrderBy.Desc),
                        type: FilterBy = Query(default=None),
                        pokedex_controller: PokedexController = Depends(get_pokedex_controller)):
        _logger.info(f'Getting pokemon from DB [order_by={order_by}] [filter_by={type}]')

        try:
            pokemons = pokedex_controller.get_all_pokemon(order_by=order_by, filter_by=type)
        except Exception:
            _logger.exception('Failed to fetch data due to an error')
            raise HTTPException(status_code=500)

        _logger.info(f'Successfully fetched pokemon [pokemon={pokemons}]')
        return paginate(pokemons)

    @router.post('/capture')
    def update_captured_pokemon(pokemon_id: int = Body(...),
                                is_captured: bool = Body(...),
                                pokedex_controller: PokedexController = Depends(get_pokedex_controller)) -> None:
        _logger.info(f'Updating captured pokemon [pokemon_id={pokemon_id}] [is_captured={is_captured}]')

        try:
            pokedex_controller.update_captured_pokemon(pokemon_id=pokemon_id, is_captured=is_captured)
        except Exception:
            _logger.exception(f'Failed to update captured pokemon [pokemon_id={pokemon_id}]')
            raise HTTPException(status_code=500)

    add_pagination(router)

    return router
