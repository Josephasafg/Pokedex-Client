import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.module.scss';
import {PokemonCards} from "./Components/PokemonCards/PokemonCards";
import {Title} from "./Components/Title/Title";
import {PokedexAPI} from "./PokedexAPI/PokedexAPI";
import {FooterPageControl} from "./Components/FooterPageControl/FooterPageControl";
import {HeaderPageControl} from "./Components/HeaderPageControl/HeaderPageControl";
import {CircularProgress, SelectChangeEvent, ThemeProvider} from "@mui/material";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {updatePage} from "./store/actionCreators";
import {PageState} from "./types";
import {PageInfo} from "./Models/PageInfo";
import {FilterBy, OrderBy} from "./Models/Query";
import CssBaseline from '@mui/material/CssBaseline';
import {DarkTheme, LightTheme} from './ThemeConfig';
import {Theme} from './Models/Theme';
import classes from "./App.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import {Pokemon} from "./Models/Pokemon";
import configData from "./ProjectConfig.json";
import {PsyduckIcon, SnorlaxIcon} from "./Components/PokeBallIcon/Icons";

const PokemonBackground = require("./Resources/pokemon_background.png");


function App() {
    const dispatch = useDispatch();

    const pokemons = useSelector((state: PageState) => state.pokemons, shallowEqual);
    const pageInfo = useSelector((state: PageState) => state.pageInfo, shallowEqual);
    const orderBy = useSelector((state: PageState) => state.orderBy, shallowEqual);
    const filterBy = useSelector((state: PageState) => state.filterBy, shallowEqual);
    const theme = useSelector((state: PageState) => state.theme, shallowEqual);
    const [isLoading, setIsLoading] = useState(false);


    const updatePokemons = React.useCallback((pageInfo: PageInfo, orderBy: OrderBy, filterBy: FilterBy, prevPokemons: Pokemon[]) => {
        const filterType = filterBy === FilterBy.ALL ? undefined : filterBy;

        setIsLoading(true);
        PokedexAPI.getAll(pageInfo.page, pageInfo.size, orderBy, filterType).then((response) => {

            if (response.items !== prevPokemons) {
                dispatch(updatePage({
                    pokemons: [...prevPokemons, ...response.items],
                    pageInfo: {page: response.page, size: response.size, total: response.total},
                    orderBy: orderBy,
                    filterBy: filterBy,
                }));
            }
            setIsLoading(false);
        }).catch(error => console.error("Failed to fetch data from server - ", error));

    }, [dispatch])

    useEffect(() => {
        if (pokemons.length === 0 || pageInfo.page === 1) {
            updatePokemons(pageInfo, orderBy, filterBy, []);
        }
    }, [])


    const handlePageChange = (event: ChangeEvent<unknown>, value: number): void => {
        updatePokemons({...pageInfo, page: value}, orderBy, filterBy, []);
    }

    // Use when we have regular pagination
    const handlePageSizeChange = (event: SelectChangeEvent): void => {
        updatePokemons({...pageInfo, size: +event.target.value, page: 1}, orderBy, filterBy, []);
    };

    const handleSortChange = (event: SelectChangeEvent): void => {
        updatePokemons({...pageInfo, page: 1}, event.target.value as OrderBy, filterBy, []);
    };

    const handleFilterChange = (event: SelectChangeEvent): void => {
        updatePokemons({...pageInfo, page: 1}, orderBy, event.target.value as FilterBy, []);
    };

    const renderPagination = (isPagination: boolean) => {
        if (isPagination) {
            return (
                <PokemonCards pokemons={pokemons}/>
            )
        }

        return (
            <InfiniteScroll
                dataLength={pageInfo.size * pageInfo.page}
                next={() => updatePokemons({...pageInfo, page: pageInfo.page + 1}, orderBy, filterBy, pokemons)}
                hasMore={pageInfo.size * pageInfo.page <= pageInfo.total}
                loader={<></>}
                endMessage={
                    <p style={{textAlign: "center"}}>
                        {PsyduckIcon}No more Pokemon for now{SnorlaxIcon}
                    </p>
                }
            >
                <PokemonCards pokemons={pokemons}/>
            </InfiniteScroll>
        )
    }

    const renderBody = (): JSX.Element => {
        // We use this when we don't use infinite scrolling for page spinner
        if (configData.PAGINATION && isLoading) {
            return <CircularProgress className={classes.spinner}/>
        }

        return (
            <div>
                <HeaderPageControl showSize={pageInfo.size}
                                   onPageChange={configData.PAGINATION ? handlePageSizeChange : undefined}
                                   onSortChange={handleSortChange}
                                   onFilterChange={handleFilterChange}/>

                {renderPagination(configData.PAGINATION)}
                {configData.PAGINATION && <FooterPageControl pageInfo={pageInfo} onChange={handlePageChange}/>}
            </div>
        )
    }

    return (
        <ThemeProvider theme={theme === Theme.LIGHT ? LightTheme : DarkTheme}>
            <CssBaseline/>
            <div style={{backgroundImage: `url(${PokemonBackground})`}} className={classes.flexWrapper}>
                <Title/>
                {renderBody()}
            </div>

        </ThemeProvider>

    );
}

export default App;
