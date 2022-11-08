import React from "react";

import "./FavoritesCardsList.css";
import {useSelector} from "react-redux";
import {StoreState} from "../../redux-toolkit/store";

export const FavoritesCardsList = () => {

    const { accessToken, username, role, id} = useSelector((store: StoreState) => store.user);

    return (
        <div className="favorites-cards-list">
            <h2>{`Hello, ${username}!`} </h2>
            <p>Check your favorites cards!</p>

        </div>

    )
}