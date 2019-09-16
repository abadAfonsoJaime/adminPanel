import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cards from "./components/cards";
import NavBar from "./components/navBar";
import CardForm from "./components/cardForm";
import NotFound from "./components/notFound";
import Simulator from "./components/simulator";
import PhoneSimulator from "./components/phoneSimulator";

class App extends Component {
  render() {
    return (
      <>
        {/* <ToastContainer /> */}
        <NavBar />
        <main className="container-fluid">
          <Switch>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/phoneSimulator" component={PhoneSimulator}></Route>
            <Route path="/simulator/:id?" component={Simulator}></Route>
            <Route path="/cards/:id" component={CardForm}></Route>
            <Route path="/cards" render={props => <Cards {...props} />} />
            <Redirect exact from="/" to="/cards" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
