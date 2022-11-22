import React from "react";
import {PageNavbar} from "../../components/PageNavbar/PageNavbar";
import {SearchingBar} from "../../components/SearchingBar/SearchingBar";
import {PokemonList} from "../../components/PokemonList/PokemonList";

import "./HomeView.css";

export const HomeView = () => {
    return (
        <div className="home-view">
            <PageNavbar/>
            <SearchingBar/>
            <PokemonList/>

        </div>
    )
}