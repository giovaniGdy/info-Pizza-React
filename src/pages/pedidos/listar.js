import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default class Pedidos extends React.Component {
  state = {
    pedidos: []
  };

  async componentDidMount() {
    await axios.get(`http://localhost:8081/pedidos`).then(res => {
      const pedidos = res.data;
      this.setState({ pedidos });
    });
    this.confirmIsLoged();
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
        <h2 class="basic-title text-center">Pedidos Feitos</h2>
        <div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Endereço</th>
                <th>Pedido Realizado em:</th>
                <th>Status:</th>
              </tr>
            </thead>
            <tbody>
              {this.state.pedidos.map(pedidos => (
                <tr>
                  <td id="infoClienteAtras">
                    <Link to={`pedido/info/${pedidos.id}`}
                    params={{id: pedidos.id}}
                    >
                      {pedidos.cliente}
                    </Link>
                  </td>
                  <td>{pedidos.endereco}</td>
                  <td>{pedidos.updatedAt}</td>
                  <td>{pedidos.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a href="/novo-pedido">Cadastrar Pedido</a>
      </body>
    );
  }
}
