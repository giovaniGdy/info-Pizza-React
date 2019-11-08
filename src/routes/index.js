import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Site from "../pages/site";

import dashPage from "../pages/dashboard/dashHome"

import Pedidos from "../pages/pedidos/listar";
import NovoPedido from "../pages/pedidos/novo";
import InfoPedido from "../pages/pedidos/info";
import Unico from "../pages/pedidos/unico";

import Cardapio from "../pages/cardapio/listar"
import NovoItem from "../pages/cardapio/novo"
import InfoCardapio from "../pages/cardapio/info"

import feedPosts from "../pages/feed/listar"
import novaPublicacao from "../pages/feed/novo"
import infoPostagem from "../pages/feed/info"

import LoginScreen from "../pages/login"
import loginAlt from "../pages/login/userAlt"

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Site} />

      <Route exact path="/dashPage" component={dashPage}/>

      <Route exact path="/pedidos" component={Pedidos}/>
      <Route exact path="/novo-pedido" component={NovoPedido} />
      <Route exact path="/pedido/info/:id" component={InfoPedido} />
      <Route exact path="/verificar-status" component={Unico} />

      <Route exact path="/cardapio" component={Cardapio} />
      <Route exact path="/adicionar-item" component={NovoItem} />
      <Route exact path="/cardapio/item-info/:id" component={InfoCardapio}/>

      <Route exact path="/feed-posts" component={feedPosts}/>
      <Route exact path="/nova-postagem" component={novaPublicacao}/>
      <Route exact path="/feed/postagem/:id" component={infoPostagem}/>

      <Route exact path="/login" component={LoginScreen} />
      <Route exact path="/user-data" component={loginAlt}/>
      
    </Switch>
  </BrowserRouter>
);

export default Routes;
