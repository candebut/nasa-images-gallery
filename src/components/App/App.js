import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Show from "../../pages/Show";
import Home from "../../pages/Home";
import Search from "../../pages/Search";
import "./App.css";

const App = () => (
  <Router>
    <div className="App">
      <main className="App-content">
        <Route exact path="/" component={Home} />
        <Route path="/search/:query" component={Search} />
        <Route path="/show/:id" component={Show} />
      </main>
    </div>
  </Router>
);

export default App;
