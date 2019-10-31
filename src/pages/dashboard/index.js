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
      <div>
        <header>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
        </header>
        <div class="navbar">
          <div class="navbarBack">
            <a href="/dashboard-manager">Home</a>
            <div class="subnav">
              <button class="subnavbtn">
                Pedidos <i class="fa fa-caret-down"></i>
              </button>
              <div class="subnav-content">
                <a href="/pedidos">Listar</a>
              </div>
            </div>
            <div class="subnav">
              <button class="subnavbtn">
                Cardapio <i class="fa fa-caret-down"></i>
              </button>
              <div class="subnav-content">
                <a href="/cardapio">Listar</a>
                <a href="/adicionar-item">Adicionar Item</a>
              </div>
            </div>
            <div class="subnav">
              <button class="subnavbtn">
                Feed de Postagens <i class="fa fa-caret-down"></i>
              </button>
              <div class="subnav-content">
                <a href="/feed-posts">Visualizar Publicações</a>
                <a href="/nova-postagem">Publicar</a>
              </div>
            </div>
          </div>
            <button class="logOutbtn" onClick={this.LogoutBtn}>Encerrar Sessão</button>
        </div>
      </div>
    );
  }  
}
