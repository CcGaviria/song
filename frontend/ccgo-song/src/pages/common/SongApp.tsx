/*
 * Cristian Gaviria - Cristian@gaviria.org
 * https://music.gaviria.org | Test La Manicurista (Tualy) | F! solo te roban el código :)
 * Copyright (c) 2012 - 2021. https://gaviria.org
 *
 */

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './variables.scss';
import Search from "../search";

function SongApp() {
  return (
      <Router>
        <Switch>
          <Route path={`#/home`}>
            <h3>Home</h3>
          </Route>
          <Route path={"/"}>
            <Search />
          </Route>
          <Route path={"#/about"}>
            <h3>About</h3>
          </Route>
        </Switch>
      </Router>
  );
}

export default SongApp;
