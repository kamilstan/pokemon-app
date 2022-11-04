import React from "react";
import {PageNavbar} from "../../components/PageNavbar/PageNavbar";
import {SearchingBar} from "../../components/SearchingBar/SearchingBar";
import {PokemonList} from "../../components/PokemonList/PokemonList";
import {BackgroundWrapper} from "../../common/BackgroundWrapper/BackgroundWrapper";

export const HomeView = () => {
    return (
        <>
            <PageNavbar/>
            <BackgroundWrapper/>
            <SearchingBar/>
            <PokemonList/>

        </>
    )
}