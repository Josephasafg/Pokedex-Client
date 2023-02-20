import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Collapse,
    Grid,
    Icon,
    IconButton,
    IconButtonProps,
    List,
    ListItem, Paper,
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
import {TypeTag} from "../TypeTag/TypeTag";
const LegendaryIcon = require("../../Resources/Icons/legendary-icon.ico");

interface PokemonProps {
    pokemon: Pokemon
}


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}


const Item = styled(ListItem)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    paddingTop: 0,
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

const MyIcon = styled(Icon)(({  }) => ({
    width: 20,
    height: 20
}));

// const LegendaryIcon = styled(LegendarySVG)`
//   width: 100%;
//   height: 20px;
// `;

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

                    {/*<Typography variant="body2">*/}
                    {/*    Generation {pokemon.generation}*/}
                    {/*</Typography>*/}
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
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Item>HP: {pokemon.hit_points}</Item>
                                <Item>Attack: {pokemon.attack}</Item>
                                <Item>Sp.Attack: {pokemon.special_attack}</Item>
                                <Item>Defense: {pokemon.defense}</Item>
                            </Grid>

                            <Grid item xs={6}>
                                <Item>Sp.Defense: {pokemon.special_defense}</Item>
                                <Item>Speed: {pokemon.speed}</Item>
                                <Item>Total: {pokemon.total}</Item>
                            </Grid>
                        </Grid>
                        <Typography className={classes.stats}>
                            Legendary: {pokemon.legendary ? "Yes" : "No"}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}