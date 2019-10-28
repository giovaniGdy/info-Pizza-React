import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Site from "../pages/site";
import Pedidos from "../pages/pedidos/listar";
import novoPedido from "../pages/pedidos/novo";
import Info from "../pages/pedidos/info";

import LoginScreen from "../pages/login"

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Site} />

      <Route exact path="/pedidos" component={Pedidos} />
      <Route exact path="/novo-pedido" component={novoPedido} />
      <Route exact path="/pedido/info/:id" component={Info} />
      <Route exact path="/login" component={LoginScreen} />
      
    </Switch>
  </BrowserRouter>
);

export default Routes;
