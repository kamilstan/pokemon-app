import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {CardRecord} from "../../types/card/card";
import {Loader} from "../../common/Loader";

import "./PokemonCard.css";
import {Button} from "react-bootstrap";

export const PokemonCard = () => {

    const [card, setCard] = useState<CardRecord | null>(null);
    const {cardId} = useParams();

    useEffect(() => {
        (async () => {
            const res = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`);
            const data = await res.json();
            setCard(data);
        })();
    }, []);

    console.log(card)

    if (card ===null) {
        return <Loader/>
    }

    return (
            <div className="pokemon-card-wrapper">
                <div className="pokemon-card-info">
                    <h2>Name: {card.data.name}</h2>
                    <p>Rarity: {card.data.rarity}</p>
                    <p>Types: {card.data.types}</p>
                    <p>Pokedex number: {card.data.nationalPokedexNumbers}</p>
                    <p>Evolves to: {card.data.evolvesTo}</p>
                    <p>Weaknesses: {card.data.weaknesses[0].type}</p>
                    <div className="pokemon-card-buttons">
                        <Link to={"/"} className="me-2"><Button variant="outline-warning">Go back</Button></Link>
                        <Button variant="outline-warning">Add to favorites</Button>
                    </div>

                </div>
                <img src={card.data.images.small} alt={card.data.name}/>
            </div>

    )
}