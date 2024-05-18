from typing import List

from pydantic import BaseModel


class Pokemon(BaseModel):
    pokemon_id: str
    number: int
    name: str
    type_one: str
    type_two: str
    total: str
    hit_points: int
    attack: int
    defense: int
    special_attack: int
    special_defense: int
    speed: int
    generation: int
    legendary: bool
    icon_url: str
    is_captured: bool = False
