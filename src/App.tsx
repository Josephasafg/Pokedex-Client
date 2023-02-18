import React, {ChangeEvent, useEffect} from 'react';
import './App.module.scss';
import {PokemonCards} from "./Components/PokemonCards/PokemonCards";
import {Title} from "./Components/Title/Title";
import {Pokemon} from "./Models/Pokemon";
import {PokedexAPI} from "./PokedexAPI/PokedexAPI";
import {FooterPageControl} from "./Components/FooterPageControl/FooterPageControl";
import {HeaderPageControl} from "./Components/HeaderPageControl/HeaderPageControl";
import {SelectChangeEvent} from "@mui/material";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {updatePage} from "./store/actionCreators";
import {PageState} from "./types";
import {PageInfo} from "./Models/PageInfo";


function App() {
    const dispatch = useDispatch();
    const pokemons = useSelector(
        (state: PageState) => state.pokemons,
        shallowEqual,
    )
    const pageInfo = useSelector(
        (state: PageState) => state.pageInfo,
        shallowEqual,
    )
    // const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    // const [pageInfo, setPageInfo] = useState<PageInfo>({page: 1, total: 0, size: 10})

    // TODO: Implement Logic to treat Mega Pokemon
    const parseMegaPokemon = (newPokemon: Pokemon[]) => {

    }

    const updatePokemons = React.useCallback((pageInfo: PageInfo) => {
        PokedexAPI.getAll(pageInfo.page, pageInfo.size).then((response) => {
            // setPokemons(response.items);
            // setPageInfo({page: response.page, size: response.size, total: response.total});
            console.log("Updating")
            dispatch(updatePage({
                pokemons: response.items,
                pageInfo: {page: response.page, size: response.size, total: response.total}
            }));
        })
    }, [dispatch])

    useEffect(() => {
        updatePokemons(pageInfo);
    }, [])


    const handlePageChange = (event: ChangeEvent<unknown>, value: number): void => {
        updatePokemons({...pageInfo, page: value});
    }

    const handlePageSizeChange = (event: SelectChangeEvent) => {
        updatePokemons({...pageInfo, size: +event.target.value});
    };

    return (
        <div className="App">
            <Title/>
            <HeaderPageControl showSize={pageInfo.size} onChange={handlePageSizeChange}/>
            <PokemonCards pokemons={pokemons}/>
            <FooterPageControl pageInfo={pageInfo} onChange={handlePageChange}/>
        </div>
    );
}

export default App;
