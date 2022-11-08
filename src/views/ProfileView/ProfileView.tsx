import React from "react";
import {PageNavbar} from "../../components/PageNavbar/PageNavbar";
import {BackgroundWrapper} from "../../common/BackgroundWrapper/BackgroundWrapper";
import {FavoritesCardsList} from "../../components/FavoritesCardsList/FavoritesCardsList";

export const ProfileView = () => {
    return (
        <>
            <PageNavbar/>
            <BackgroundWrapper/>
            <FavoritesCardsList/>
        </>
    )
}