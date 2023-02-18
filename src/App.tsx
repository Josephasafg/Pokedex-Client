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
import {FilterBy, OrderBy} from "./Models/Query";


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

    const filterBy = useSelector(
        (state: PageState) => state.filterBy,
        shallowEqual,
    )

    // TODO: Implement Logic to treat Mega Pokemon
    const parseMegaPokemon = (newPokemon: Pokemon[]) => {

    }

    const updatePokemons = React.useCallback((pageInfo: PageInfo, orderBy: OrderBy, filterBy: FilterBy) => {
        const filterType = filterBy === FilterBy.ALL ? undefined : filterBy;

        PokedexAPI.getAll(pageInfo.page, pageInfo.size, orderBy, filterType).then((response) => {
            dispatch(updatePage({
                pokemons: response.items,
                pageInfo: {page: response.page, size: response.size, total: response.total},
                orderBy: orderBy,
                filterBy: filterBy,
            }));
        })
    }, [dispatch])

    useEffect(() => {
        updatePokemons(pageInfo, orderBy, filterBy);
    }, [])


    const handlePageChange = (event: ChangeEvent<unknown>, value: number): void => {
        updatePokemons({...pageInfo, page: value}, orderBy, filterBy);
    }

    const handlePageSizeChange = (event: SelectChangeEvent): void => {
        updatePokemons({...pageInfo, size: +event.target.value}, orderBy, filterBy);
    };

    const handleSortChange = (event: SelectChangeEvent): void => {
        updatePokemons(pageInfo, event.target.value as OrderBy, filterBy);
    };

    const handleFilterChange = (event: SelectChangeEvent): void => {
        updatePokemons(pageInfo, orderBy, event.target.value as FilterBy);
    };


    return (
        <div className="App">
            <Title/>
            <HeaderPageControl showSize={pageInfo.size}
                               onChange={handlePageSizeChange}
                               onSortChange={handleSortChange}
                               onFilterChange={handleFilterChange}/>
            <PokemonCards pokemons={pokemons}/>
            <FooterPageControl pageInfo={pageInfo} onChange={handlePageChange}/>
        </div>
    );
}

export default App;
