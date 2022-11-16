import React, {SyntheticEvent, useEffect, useState} from "react";
import * as _ from "lodash";
import "./FavoritesCardsList.css";
import {useSelector} from "react-redux";
import {StoreState} from "../../redux-toolkit/store";
import {CardRecord} from "../../types/card/card";
import {Loader} from "../../common/Loader/Loader";
import {Link} from "react-router-dom";
import {Button, Card, Image} from "react-bootstrap";

export const FavoritesCardsList = () => {

    const {username, id} = useSelector((store: StoreState) => store.user);

    const [favoritesCardsIds, setFavoritesCardsIds] = useState<string[]>([]);
    const [cards, setCards] = useState<CardRecord[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const res = await fetch(`http://localhost:8080/api/user/${id}`, {
                headers: {
                    "Content-Type":"application/json",
                }
            });
            const data = await res.json();
            setFavoritesCardsIds(data.favoritesCardsIds.split(","));
            setIsLoading(false);
        })();
    }, []);


    useEffect(() => {
        setIsLoading(true);
        favoritesCardsIds.map(favoriteCardsId => {
            (async () => {
                const res = await fetch(`https://api.pokemontcg.io/v2/cards/${favoriteCardsId}`, {
                    headers: {
                        "Content-Type":"application/json",
                    }
                });
                const data = await res.json();
                setCards(prevCards =>_.uniqBy([...prevCards, data.data],"id"));
                setIsLoading(false);
            })();
        })
        return () => {
            setCards([]);
        }

        }, [favoritesCardsIds]);

    const DeleteFromFavorites = (cardId:string, e:SyntheticEvent) => {
        e.preventDefault();
        (async () => {
            const res = await fetch(`http://localhost:8080/api/user/${id}/delete/${cardId}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            setFavoritesCardsIds(data.favoritesCardsIds.split(","))
            setIsLoading(false);
        })();
        alert(`Element ${cardId} został usunięty z Ulubionych`)
    }


    if (isLoading) {
        return <Loader/>
    }
    if (favoritesCardsIds.length < 1 ) {
        return <p>Brak kart</p>
    }

    console.log(cards);
    return (
        <div className="favorites-cards">
            <h4>Hello, <b>{`${username}`}</b>! </h4>
            <p>Check your favorites cards!</p>
            <div className="favorites-cards-list">
                {
                    cards.map((card) => (

                        <Card key={card.id} className="favorites-list-item">
                            <Card.Header
                                as="h5"
                                className="favorites-list-header"
                            >
                                <h6 className="favorites-list-name">{card.name}</h6>
                                <Button
                                    onClick={(e) => DeleteFromFavorites(card.id, e)}
                                    className="favorites-list-button"
                                    variant="outline-warning"
                                >
                                   Delete
                                </Button>
                            </Card.Header>
                            <Link  to={`/card/${card.id}`}>
                                <Card.Img variant="top" src={card.images.small} />
                            </Link>
                        </Card>
                    ))
                }
            </div>

        </div>

        )
}