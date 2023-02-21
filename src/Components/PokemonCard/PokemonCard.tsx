import React from "react";
import {
    Card as MCard,
    CardActions,
    CardContent,
    CardMedia,
    Collapse,
    Divider,
    Grid,
    IconButton,
    IconButtonProps,
    ListItem,
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
import {CheckedPokeBallIcon, UnCheckedPokeBallIcon} from "../PokeBallIcon/Icons";
import {TypeTag} from "../TypeTag/TypeTag";


interface PokemonProps {
    pokemon: Pokemon
}


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}


const Item = styled(ListItem)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    paddingTop: 0,
}));

const Card = styled(MCard)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#2A2A2A' : '#f9f9f9',
}));

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

    const onCapturedClick = React.useCallback(async () => {
        const response = await PokedexAPI.postCapture(pokemon.pokemon_id, !currentPokemon.is_captured);

        if (response.status === 200) {
            dispatch(updateIsCaptured(pokemon.pokemon_id, !currentPokemon.is_captured))
        }
    }, [dispatch, pokemon.is_captured])

    return (
        <div className={classes.card}>
            <Card>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        #{pokemon.number}
                    </Typography>
                    <div className={classes.cardImage}>
                        <CardMedia
                            component="img"
                            image={createIconURL(pokemon.icon_url, pokemon.name).toLowerCase()}
                            sx={{objectFit: "contain", width: "75%"}}
                        />
                    </div>

                    <Typography variant="h5" className={classes.name}>
                        {parseName(pokemon.name)}
                    </Typography>

                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        <TypeTag pokeType={pokemon.type_one}/>
                        {pokemon.type_two && <TypeTag pokeType={pokemon.type_two}/>}
                    </Typography>

                </CardContent>
                <CardActions>
                    <IconButton aria-label="add to favorites"
                                onClick={onCapturedClick}>
                        {currentPokemon.is_captured ? CheckedPokeBallIcon : UnCheckedPokeBallIcon}
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
                        <Grid container>
                            <Grid item xs>
                                <Item>HP: {pokemon.hit_points}</Item>
                                <Item>Attack: {pokemon.attack}</Item>
                                <Item>Sp.Attack: {pokemon.special_attack}</Item>
                                <Item>Defense: {pokemon.defense}</Item>
                            </Grid>

                            <Grid item xs>
                                <Item>Sp.Defense: {pokemon.special_defense}</Item>
                                <Item>Speed: {pokemon.speed}</Item>
                                <Item>Total: {pokemon.total}</Item>
                            </Grid>


                        </Grid>
                        <Divider/>

                        <Grid container>
                            <Grid item xs>
                                <Item>Legendary: {pokemon.legendary ? "Yes" : "No"}</Item>
                            </Grid>
                            <Grid item xs>
                                <Item>Generation: {pokemon.generation}</Item>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}