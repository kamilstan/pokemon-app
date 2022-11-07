import React, {useState} from 'react';

import {Route, Routes} from "react-router-dom";
import {LoginView} from "./views/LoginView/LoginView";
import {HomeView} from "./views/HomeView/HomeView";
import {RegistrationView} from "./views/RegistrationView/RegistrationView";
import {SearchContext} from "./contexts/search.context";
import {SearchInterface} from "./types/search/search";
import {CardView} from "./views/CardView/CardView";

import './App.css';
import {useSelector} from "react-redux";
import {StoreState} from "./redux-toolkit/store";

function App() {

    const [search, setSearch] = useState<SearchInterface>({
        inputSearch: '',
        selectSearch: '*',
    });

    const { id } = useSelector((store: StoreState) => store.user);

  return (
      <SearchContext.Provider value={{search, setSearch}}>
          <Routes>
              <Route
                  path="/:userId"
                  element={<HomeView />}
              />
              <Route
                  path="/"
                  element={<HomeView />}
              />
              <Route
                  path="/login"
                  element={<LoginView />}
              />
              <Route
                  path="/registration"
                  element={<RegistrationView />}
              />
              <Route
                  path="/card/:cardId"
                  element={<CardView />}
              />
          </Routes>
      </SearchContext.Provider>
  )
}

export default App;
