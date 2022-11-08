import React, {SyntheticEvent, useContext, useEffect, useState} from "react";

import "./PokemonList.css"
import {Card, Button} from "react-bootstrap";
import {SearchContext} from "../../contexts/search.context";
import {Link} from "react-router-dom";
import {CardRecord} from "../../types/card/card";
import {Loader} from "../../common/Loader/Loader";

export const PokemonList = () => {

    const [cards, setCards] = useState<CardRecord[] | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const {search, setSearch} = useContext(SearchContext);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const res = await fetch(`https://api.pokemontcg.io/v2/cards/?page=${page}&pageSize=${pageSize}&q=types:${search.selectSearch} name:${search.inputSearch}*`, {
                headers: {
                    "Content-Type":"application/json",
                }
            });
            const data = await res.json();
            setCards(data.data);
            setIsLoading(true);
        })();
    }, [pageSize, search]);

    const LoadingCards = (e:SyntheticEvent) => {
        e.preventDefault();
        setPageSize( pageSize + 5);
    }

    if (cards === null) {
        return <Loader/>
    }

    if (cards.length <= 0) {
        return <p className="pokemon-list pokemon-list-info">There is not such a card. Try again!</p>


    }

    console.log(cards)

    return (
        <div className="pokemon-list-wrapper" >
            <div className="pokemon-list">
                <div className="pokemon-list-cards">
                {
                    cards.map((card:CardRecord) => (

                            <Card key={card.id}className="pokemon-list-item">
                                <Link  to={`/card/${card.id}`}>
                                    <Card.Img variant="top" src={card.images.small} />
                                </Link>
                                <Button> Add to favorites</Button>
                            </Card>

                    ))
                }
                </div>
                    <Button variant="outline-warning" className="py-2 px-5 pokemon-list-button" onClick={LoadingCards}> Load more </Button>

            </div>
        </div>
    )
}

//Dodac loadery - do przycisku zeby znikal na czas wczytywania danych a pojawiac sie za niego bedzie wlasnie loader