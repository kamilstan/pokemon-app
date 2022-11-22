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
            <Form className="p-2 w-100 searching-form" onSubmit={setSearchingResult}>
                <Form.Group className="w-100 searching-input" >
                    <Form.Label className="font-monospace searching-label">Find your pokemon card!</Form.Label>
                    <div className="searching-forms">
                        <Form.Control
                            className="searching-by-name me-2 p-3"
                            type="text"
                            placeholder="Enter pokemon name.."
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                        />
                        <Form.Select
                            aria-label="Default select example"
                            className="searching-by-type me-2 p-3"
                            value={selectValue}
                            onChange={e => setSelectValue(e.target.value)}
                        >
                            <option className="searching-option" value="*">All types</option>
                            <option className="searching-option" value="Colorless">Normal</option>
                            <option className="searching-option" value="Fire">Fire</option>
                            <option className="searching-option" value="Water">Water</option>
                            <option className="searching-option" value="Grass">Grass</option>
                            <option className="searching-option" value="Fighting">Fighting</option>
                            <option className="searching-option" value="Lightning">Electric</option>
                            <option className="searching-option" value="Psychic">Psychic</option>
                            <option className="searching-option" value="Metal">Steel</option>
                            <option className="searching-option" value="Dragon">Dragon</option>
                            <option className="searching-option" value="Darkness">Dark</option>
                            <option className="searching-option" value="Fairy">Fairy</option>
                        </Form.Select>
                    </div>
                </Form.Group>
                <Button variant="outline-warning" className="searching-button py-2 px-5" type="submit">Search</Button>
            </Form>
        </>

    )
}