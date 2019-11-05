import React from "react";

import "../styles/dashboard/dashboardStyle.css";

export default class infoPizzaAdminDashboard extends React.Component {
  LogoutBtn() {
    const r = window.confirm("Deseja Finalizar a Sessão?");
    if (r === true) {
      localStorage.clear();
    }
  }

  render() {
    return (
      
      <div class="navbar">
       <a href="/dashboard-manager">Home</a>
       <div class="dropdown">
         <button class="dropbtn">Pedidos
           <i class="fa fa-caret-down"></i>
         </button>
         <div class="dropdown-content">
           <a href="/pedidos">Listar</a>
         </div>
       </div>
       <div class="dropdown">
         <button class="dropbtn">Cardapio
           <i class="fa fa-caret-down"></i>
         </button>
         <div class="dropdown-content">
           <a href="/cardapio">Listar Itens</a>
           <a href="/adicionar-item">Adicionar Item</a>
         </div>
       </div>
       <div class="dropdown">
         <button class="dropbtn">Feed
           <i class="fa fa-caret-down"></i>
         </button>
         <div class="dropdown-content">
           <a href="#">Link 1</a>
           <a href="#">Link 2</a>
           <a href="#">Link 3</a>
         </div>
       </div>
       <div class="dropdown">
         <button class="dropbtn">Sessão
           <i class="fa fa-caret-down"></i>
         </button>
         <div class="dropdown-content">
           <a href="#">Link 1</a>
           <a href="#">Link 2</a>
           <a href="#">Link 3</a>
         </div>
       </div>
       
     </div> 
    );
  }
}
