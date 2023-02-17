import React from 'react';
import './App.module.scss';
import {PokemonCards} from "./Components/PokemonCards/PokemonCards";
import {Title} from "./Components/Title/Title";

function App() {
    return (
        <div className="App">
            <Title/>
            <PokemonCards/>
        </div>
    );
}

export default App;
