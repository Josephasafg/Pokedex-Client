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
import {OrderBy} from "./Models/Query";


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

    const orderBy = useSelector(
        (state: PageState) => state.orderBy,
        shallowEqual,
    )

    // TODO: Implement Logic to treat Mega Pokemon
    const parseMegaPokemon = (newPokemon: Pokemon[]) => {

    }

    const updatePokemons = React.useCallback((pageInfo: PageInfo, orderBy: OrderBy) => {
        PokedexAPI.getAll(pageInfo.page, pageInfo.size, orderBy).then((response) => {
            dispatch(updatePage({
                pokemons: response.items,
                pageInfo: {page: response.page, size: response.size, total: response.total},
                orderBy: orderBy
            }));
        })
    }, [dispatch])

    useEffect(() => {
        updatePokemons(pageInfo, orderBy);
    }, [])


    const handlePageChange = (event: ChangeEvent<unknown>, value: number): void => {
        updatePokemons({...pageInfo, page: value}, orderBy);
    }

    const handlePageSizeChange = (event: SelectChangeEvent) => {
        updatePokemons({...pageInfo, size: +event.target.value}, orderBy);
    };

    const handleSortChange = (event: SelectChangeEvent) => {
        updatePokemons(pageInfo, event.target.value as OrderBy);
    };

    return (
        <div className="App">
            <Title/>
            <HeaderPageControl showSize={pageInfo.size} onChange={handlePageSizeChange} onSortChange={handleSortChange}/>
            <PokemonCards pokemons={pokemons}/>
            <FooterPageControl pageInfo={pageInfo} onChange={handlePageChange}/>
        </div>
    );
}

export default App;
