import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Collapse,
    IconButton,
    IconButtonProps,
    Paper,
    Typography,
} from '@mui/material';
import classes from "./PokemonCard.module.scss";
import {Pokemon} from "../../Models/Pokemon";
import {styled} from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {createIconURL, parseName} from "./CardUtils";
import {PokedexAPI} from "../../PokedexAPI/PokedexAPI";
import {updateIsCaptured} from "../../store/actionCreators";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {PageState} from "../../types";
import {CheckedPokeBallIcon} from "../PokeBallIcon/CheckedPokeBallIcon";
import {UnCheckedPokeBallIcon} from "../PokeBallIcon/UnCheckedPokeBallIcon";


interface PokemonProps {
    pokemon: Pokemon
}


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const PokemonCard: React.FC<PokemonProps> = (
    {
        pokemon,
    }) => {
    const [expanded, setExpanded] = React.useState(false);
    const currentPokemon = useSelector((state: PageState) => state.pokemons.find(p => p.pokemon_id === pokemon.pokemon_id), shallowEqual) as Pokemon
    const dispatch = useDispatch();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const getTypes = (pokemon: Pokemon): string => {
        return pokemon.type_two ? `${pokemon.type_one} | ${pokemon.type_two}` : pokemon.type_one;
    }

    const onCapturedClick = React.useCallback(async () => {
        const response = await PokedexAPI.postCapture(pokemon.pokemon_id, !currentPokemon.is_captured);

        if (response.status === 200) {
            dispatch(updateIsCaptured(pokemon.pokemon_id, !currentPokemon.is_captured))
        }
    }, [dispatch, pokemon])

    return (
        <div className={classes.card}>
            <Card>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        #{pokemon.number}
                    </Typography>

                    <Typography variant="h5">
                        {parseName(pokemon.name)}
                    </Typography>

                    <div className={classes.cardImage}>
                        <CardMedia
                            component="img"
                            image={createIconURL(pokemon.icon_url, pokemon.name).toLowerCase()}
                            sx={{objectFit: "contain", width: "45%"}}
                        />
                    </div>

                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {getTypes(pokemon)}
                    </Typography>

                    <Typography variant="body2">
                        Generation {pokemon.generation}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="add to favorites"
                                onClick={onCapturedClick}>
                        {currentPokemon.is_captured ? <CheckedPokeBallIcon/> : <UnCheckedPokeBallIcon/>}
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography className={classes.stats}>
                            HP: {pokemon.hit_points} Attack: {pokemon.attack} Defense: {pokemon.defense} Sp.
                            Attack: {pokemon.special_attack} Sp.
                            Defense: {pokemon.special_defense} Speed: {pokemon.speed} Total: {pokemon.total}
                        </Typography>
                        <Typography className={classes.stats}>
                            Legendary: {pokemon.legendary ? "Yes" : "No"}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}