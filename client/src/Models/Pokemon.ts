export interface Pokemon {
    pokemon_id: number
    number: number
    name: string
    type_one: string
    type_two: string
    total: string
    hit_points: number
    attack: number
    defense: number
    special_attack: number
    special_defense: number
    speed: number
    generation: number
    legendary: boolean
    icon_url: string
    is_captured: boolean
}