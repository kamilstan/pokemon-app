import React from 'react';

import {Route, Routes} from "react-router-dom";
import {LoginView} from "./views/LoginView/LoginView";
import {HomeView} from "./views/HomeView/HomeView";
import {RegistrationView} from "./views/RegistrationView/RegistrationView";

import './App.css';

function App() {
  return (
      <Routes>
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
      </Routes>
  )
}

export default App;
