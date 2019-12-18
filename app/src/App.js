import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

const Calculator = lazy(() => import("./pages/Calculator"));
const OtherPage = lazy(() => import("./pages/OtherPage"));

export default () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Fibonacci Calculator</h1>
          <Link to="/">Home</Link>
          <Link to="otherpage">Other Page</Link>
        </header>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Calculator} />
              <Route exact path="/otherpage" component={OtherPage} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};
