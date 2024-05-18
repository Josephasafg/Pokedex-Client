from enum import Enum


class OrderBy(str, Enum):
    Asc = 'ascend'
    Desc = 'descend'


class FilterBy(str, Enum):
    Grass = 'Grass'
    Fire = 'Fire'
    Water = 'Water'
    Electric = 'Electric'
    Dragon = 'Dragon'
    Ghost = 'Ghost'
    Fairy = 'Fairy'
    Normal = 'Normal'
    Bug = 'Bug'
    Psychic = 'Psychic'
    Ice = 'Ice'
    Ground = 'Ground'
    Rock = 'Rock'
    Fighting = 'Fighting'
    Flying = 'Flying'
    Poison = 'Poison'
    Steel = 'Steel'
    Dark = 'Dark'
