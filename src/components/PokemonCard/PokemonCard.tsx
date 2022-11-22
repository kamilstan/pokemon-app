import React, {SyntheticEvent, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {CardRecord} from "../../types/card/card";
import {Loader} from "../../common/Loader/Loader";

import "./PokemonCard.css";
import {Button} from "react-bootstrap";
import {useSelector} from "react-redux";
import {StoreState} from "../../redux-toolkit/store";
import {apiUrl} from "../../config/api";

export const PokemonCard = () => {

    const {id} = useSelector((store: StoreState) => store.user);
    const [isLoading, setIsLoading] = useState(false);
    const [card, setCard] = useState<CardRecord | null>(null);
    const {cardId} = useParams();

    useEffect(() => {
        (async () => {
            const res = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`);
            const data = await res.json();
            setCard(data);
        })();
    }, []);

    const AddingCardToFavorites = (cardId:string, e:SyntheticEvent) => {
        e.preventDefault();

        setIsLoading(true);
        (async () => {
            const res = await fetch(`${apiUrl}/user/${id}/add/${cardId}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (data.message) {
                alert(data.message);
            } else {
                alert(`Dodano kartę ${cardId} do ulubionych`);
            }
            setIsLoading(false);
        })();
    }

    if (isLoading) {
        return <Loader/>
    }

    return (
            <div className="pokemon-card-wrapper">
                <div className="pokemon-card-info">
                    <h2>Name: {card.data.name}</h2>
                    <p>Pokedex number: <span>{card.data.nationalPokedexNumbers}</span></p>
                    <p>Types: <span>{card.data.types}</span></p>
                    <p>Rarity: <span>{card.data.rarity ? card.data.rarity : "No data"}</span></p>
                    <p>Evolves to: <span>{card.data.evolvesTo ? card.data.evolvesTo : "No evolve"}</span></p>
                    <p>Weaknesses: <span>{card.data.weaknesses ? card.data.weaknesses[0].type : "No data"}</span></p>
                    <div className="pokemon-card-buttons">
                        <Link to="/" className="me-2"><Button variant="outline-warning">Go home</Button></Link>
                        <Button
                            onClick={(e) => AddingCardToFavorites(card.data.id, e)}
                            variant="outline-warning"
                        >
                            Add card
                        </Button>
                    </div>
                </div>
                <img src={card.data.images.small} alt={card.data.name}/>
            </div>

    )
}