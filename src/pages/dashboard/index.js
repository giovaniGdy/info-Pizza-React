import React from "react";

import "../styles/dashboard/dashboardStyle.css";

export default class infoPizzaAdminDashboard extends React.Component {
  

  LogoutBtn() {
    const r = window.confirm("Deseja Finalizar a Sessão?")
    if (r === true) {
      localStorage.clear()
    } 
  }

  render() {
    return (
      <div id="dashboardBody">
        <header>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
        </header>
        <div id="navbar">
          <div id="navbarBack">
            <a href="/dashboard-manager" id="dashboardHome">Home</a>
            <div id="subnav">
              <button id="subnavbtn">
                Pedidos <i id="fa fa-caret-down"></i>
              </button>
              <div id="subnav-content">
                <a href="/pedidos">Listar</a>
              </div>
            </div>
            <div id="subnav">
              <button id="subnavbtn">
                Cardapio <i id="fa fa-caret-down"></i>
              </button>
              <div id="subnav-content">
                <a href="/cardapio">Listar</a>
                <a href="/adicionar-item">Adicionar Item</a>
              </div>
            </div>
            <div id="subnav">
              <button id="subnavbtn">
                Feed de Postagens <i id="fa fa-caret-down"></i>
              </button>
              <div id="subnav-content">
                <a href="/feed-posts">Visualizar Publicações</a>
                <a href="/nova-postagem">Publicar</a>
              </div>
            </div>
          </div>
            <button id="logOutbtn" onClick={this.LogoutBtn}>Encerrar Sessão</button>
        </div>
      </div>
    );
  }  
}
