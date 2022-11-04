import React, {SyntheticEvent, useContext, useState} from "react";
import {Button, Form} from "react-bootstrap";

import "./SearchingBar.css"
import {SearchContext} from "../../contexts/search.context";

export const SearchingBar = () => {

    const {search, setSearch} = useContext(SearchContext);
    const [inputValue, setInputValue] = useState(search.inputSearch);
    const [selectValue, setSelectValue] = useState(search.selectSearch);
    const setSearchingResult = (e:SyntheticEvent) => {
        e.preventDefault();
        setSearch({
            inputSearch:inputValue,
            selectSearch:selectValue,
        });
    }

    return (
        <>
            <Form className="p-3 w-100 searching-form" onSubmit={setSearchingResult}>

                <Form.Group className="w-100 searching-input" >
                    <Form.Label className="font-monospace w-50 mx-5 searching-label">Find your pokemon card!</Form.Label>
                    <Form.Control
                        className="w-25 mx-4 py-2 px-3"
                        type="text"
                        placeholder="Enter pokemon name.."
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <Form.Select
                        aria-label="Default select example"
                        className="w-25"
                        value={selectValue}
                        onChange={e => setSelectValue(e.target.value)}
                    >
                        <option value="*">All types</option>
                        <option value="Colorless">Normal</option>
                        <option value="Fire">Fire</option>
                        <option value="Water">Water</option>
                        <option value="Grass">Grass</option>
                        <option value="Fighting">Fighting</option>
                        <option value="Lightning">Electric</option>
                        <option value="Psychic">Psychic</option>
                        <option value="Metal">Steel</option>
                        <option value="Dragon">Dragon</option>
                        <option value="Darkness">Dark</option>
                        <option value="Fairy">Fairy</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="outline-warning" className="py-2 px-5" type="submit">Search</Button>
            </Form>
        </>

    )
}