import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Site from "../pages/site";

import Pedidos from "../pages/pedidos/listar";
import NovoPedido from "../pages/pedidos/novo";
import InfoPedido from "../pages/pedidos/info";

import Cardapio from "../pages/cardapio/listar"
import NovoItem from "../pages/cardapio/novo"
import InfoCardapio from "../pages/cardapio/info"


import LoginScreen from "../pages/login"

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Site} />

      <Route exact path="/pedidos" component={Pedidos} />
      <Route exact path="/novo-pedido" component={NovoPedido} />
      <Route exact path="/pedido/info/:id" component={InfoPedido} />

      <Route exact path="/cardapio" component={Cardapio} />
      <Route exact path="/adicionar-item" component={NovoItem} />
      <Route exact path="/cardapio/item-info/:id" component={InfoCardapio}/>

      <Route exact path="/login" component={LoginScreen} />
      
    </Switch>
  </BrowserRouter>
);

export default Routes;
