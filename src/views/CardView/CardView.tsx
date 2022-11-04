import React from "react";
import {PokemonCard} from "../../components/PokemonCard/PokemonCard";
import {PageNavbar} from "../../components/PageNavbar/PageNavbar";
import {BackgroundWrapper} from "../../common/BackgroundWrapper/BackgroundWrapper";

export const CardView = () => {
    return(
        <>

            <PageNavbar/>
            <BackgroundWrapper/>
            <PokemonCard/>
        </>

    )
}