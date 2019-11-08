import React from 'react';
import Routes from './routes'

import "./pages/styles/site/siteStyles.css";

import "./pages/styles/cardapio/info.css";
import "./pages/styles/cardapio/listagem.css";
import "./pages/styles/cardapio/novo.css";

import "./pages/styles/dashboard/dashboard.css";
import "./pages/styles/dashboard/dashboardBack.css";

import "./pages/styles/login/login.css";
import "./pages/styles/login/update.css";

import "./pages/styles/feed/info.css";
import "./pages/styles/feed/listagem.css";
import "./pages/styles/feed/novo.css";

import "./pages/styles/pedidos/info.css";
import "./pages/styles/pedidos/listagem.css";
import "./pages/styles/pedidos/novo.css";
import "./pages/styles/pedidos/status.css";


function App() {
  return (
    <>
    <Routes />
    </>
  );
}

export default App;
