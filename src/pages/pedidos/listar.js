import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Auth from "../../components/Auth/auth";

import "../styles/pedidos/listagem.css";

import InfoPizzaAdminDashboard from "../dashboard";

export default class Pedidos extends React.Component {
  state = {
    pedidos: []
  };

  async componentDidMount() {
    const r = await Auth();
    if (r === true) {
      this.carregar();
    } else {
      this.props.history.push("/");
    }
  }

  async carregar() {
    await axios.get(`http://localhost:8081/pedidos`).then(res => {
      console.log(res.data)
      const pedidos = res.data;
      this.setState({ pedidos });
    });
  }

  render() {
    return (
      <body class="container">
        <InfoPizzaAdminDashboard />
        <h2 class="basic-title text-center">Pedidos Feitos</h2>
        <div class="listagem">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Pedido Realizado em:</th>
                <th>Valor:</th>
                <th>Status:</th>
              </tr>
            </thead>
            <tbody>
              {this.state.pedidos.map(pedidos => (
                <tr>
                  <td id="infoClienteAtras">
                    <Link
                      to={`pedido/info/${pedidos.id}`}
                      params={{ id: pedidos.id }}
                    >
                      {pedidos.cliente}
                    </Link>
                  </td>
                  <td>{pedidos.updatedAt}</td>
                  <td>R${pedidos.preco}</td>
                  <td>{pedidos.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </body>
    );
  }
}
