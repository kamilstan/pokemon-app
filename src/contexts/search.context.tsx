import {createContext} from "react";
import {SearchInterface} from "../types/search/search";

export const SearchContext = createContext({
    search: {
        inputSearch: "",
        selectSearch: "",
    },
    setSearch: (s: SearchInterface) => {},
})