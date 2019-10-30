import React from "react";

import { confirmIsLoged } from '../../services/Autenticator'

import { Link } from "react-router-dom";

import axios from "axios";

export default class Cardapio extends React.Component {
  state = {
    cardapio: []
  };

  async componentDidMount() {
    confirmIsLoged();

    await axios.get(`http://localhost:8081/cardapio`).then(res => {
      const cardapio = res.data;
      this.setState({ cardapio });
    });  
      
  }

  async confirmIsLoged() {
    const loginToken = localStorage.getItem('info-Pizza-token-for-login');
    const loginUser = localStorage.getItem('info-Pizza-userName-for-login');
    const loginPass = localStorage.getItem('info-Pizza-senha-for-login');

    if (loginToken === null && loginUser === null && loginPass === null) {
      this.props.history.push('/')
      localStorage.clear()
    }
  }

  render() {
    return (
      <body class="container">
        <Link to="/"> Home </Link>
        <h2 class="basic-title text-center">cardapio</h2>
        <div>
          <table class="table table-bordered">
            <div>
              {this.state.cardapio.map(item => (
                
                <div id="blocoItem">
                <Link to={`/cardapio/item-info/${item.id}`} params={{id: item.id}}> {item.nome} </Link> <br/>
                <img src={`${item.imgUrl}`} id="itemImg" alt="item do Cardapio"/><br/>
                <p id="itemPreco">R$ {item.preco}</p> <br/>
                <p id="itemStatus"> {item.status}</p>
                </div>

              ))}
            </div>
          </table>
        </div>
        <a href="/adicionar-item">Adicionar Novo Item</a>
      </body>
    );
  }
}
