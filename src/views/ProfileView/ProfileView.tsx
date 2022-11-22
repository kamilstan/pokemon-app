import React from "react";
import {PageNavbar} from "../../components/PageNavbar/PageNavbar";
import {FavoritesCardsList} from "../../components/FavoritesCardsList/FavoritesCardsList";

import "./ProfileView.css";

export const ProfileView = () => {
    return (
        <div className="profile-view">
            <PageNavbar/>
            <FavoritesCardsList/>
        </div>
    )
}