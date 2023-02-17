import React from 'react';
import './App.module.scss';
import {PokemonCard} from "./Components/PokemonCard/PokemonCard";
import classes from "./App.module.scss";

function App() {
    return (
        <div className="App">
            <div className={classes.cardsContainer}>
                <PokemonCard/>
                <PokemonCard/>
            </div>
        </div>
    );
}

export default App;
