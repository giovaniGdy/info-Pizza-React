import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Auth from "../../components/Auth/auth";

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
      console.log(res.data);
      const pedidos = res.data;
      this.setState({ pedidos });
    });
  }

  render() {
    return (
      <body id="listaBack">
        <InfoPizzaAdminDashboard />
        <table id="listaBody">
          <thead>
            <tr>
              <th id="tituloTabela">Cliente</th>
              <th id="tituloTabela">Horário/Data:</th>
              <th id="tituloTabela">Pedido:</th>
              <th id="tituloTabela">Valor:</th>
              <th id="tituloTabela">Status:</th>
            </tr>
          </thead>
          <tbody id="listaDePedidosBack">
            {this.state.pedidos.map(pedidos => (
              <tr id="itemCardapio">
                <td id="infoTabela">
                  <Link
                    to={`pedido/info/${pedidos.id}`}
                    params={{ id: pedidos.id }}
                    id="linkInfosCliente"
                  >
                    {pedidos.cliente}
                  </Link>
                </td>
                <td id="infoTabela">
                  {pedidos.updatedAt
                    .replace("T", "  == ")
                    .replace(/-/g, "/")
                    .replace(".000Z", "")}
                </td>
                <td id="infoTabela">{pedidos.pedido}</td>
                <td id="infoTabela">R${pedidos.preco}</td>
                <td id="infoTabela">{pedidos.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </body>
    );
  }
}
