import React from "react";

export default class infoPizzaAdminDashboard extends React.Component {
  LogoutBtn() {
    const r = window.confirm("Deseja Finalizar a Sessão?");
    if (r === true) {
      localStorage.clear();
    }
  }

  render() {
    return (
      <div>
        <div class="navbar">
          <a href="/dashPage">Home</a>
          <div class="dropdown">
            <button class="dropbtn">
              Pedidos
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="/pedidos">Listar</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">
              Cardapio
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="/cardapio">Listar Itens</a>
              <a href="/adicionar-item">Adicionar Item</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">
              Feed
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content"></div>
            <div class="dropdown-content">
              <a href="/feed-posts">Listar Postagens</a>
              <a href="/nova-postagem">Fazer Postagem</a>
            </div>
          </div>
          <div class="dropdown" id="sessionDropdown">
            <button class="dropbtn">
              Sessão
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="#Deslogar" onClick={this.LogoutBtn}>
                Deslogar
              </a>
              <a href="/user-data">Alterar Informações</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
