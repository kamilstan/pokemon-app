import React, {SyntheticEvent, useContext, useEffect, useState} from "react";

import "./PokemonList.css"
import {Card, Button} from "react-bootstrap";
import {SearchContext} from "../../contexts/search.context";
import {Link} from "react-router-dom";
import {CardRecord} from "../../types/card/card";
import {Loader} from "../../common/Loader/Loader";
import * as _ from "lodash";
import {useSelector} from "react-redux";
import {StoreState} from "../../redux-toolkit/store";

export const PokemonList = () => {

    const {id} = useSelector((store: StoreState) => store.user);

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

    const AddingCardToFavorites = (cardId:string, e:SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        (async () => {
            const res = await fetch(`http://localhost:8080/api/user/${id}/add/${cardId}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            alert("Dodano kartę do ulubionych");
            setIsLoading(false);
        })();

    }

    if (cards === null) {
        return <Loader/>
    }

    if (cards.length <= 0) {
        return <p className="pokemon-list pokemon-list-info">There is not such a card. Try again!</p>

    }

    return (
        <div className="pokemon-list-wrapper" >
            <div className="pokemon-list">
                <div className="pokemon-list-cards">
                {
                    cards.map((card:CardRecord) => (

                            <Card key={card.id}className="pokemon-list-item">
                                <Card.Header
                                    as="h5"
                                    className="pokemon-list-header"
                                >
                                    <h6 className="pokemon-list-name">{card.name}</h6>
                                    <Button
                                        className="pokemon-list-button"
                                        variant="outline-warning"
                                        onClick={(e) => AddingCardToFavorites(card.id, e)}
                                    >
                                        Add card
                                    </Button>
                                </Card.Header>
                                <Link  to={`/card/${card.id}`}>
                                    <Card.Img variant="top" src={card.images.small} />
                                </Link>

                            </Card>

                    ))
                }
                </div>
                    <Button variant="outline-warning" className="py-2 px-5 pokemon-list-button-loader" onClick={LoadingCards}> Load more </Button>

            </div>
        </div>
    )
}
