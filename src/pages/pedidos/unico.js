import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Unico extends React.Component {
  state = {
    id: 0,

    pedido: "~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~",
    preco: "~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~",
    status: "~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~",
    alteracao: "~+~+~+~+~+~+~+~+~+~+~+~+~+~+~+~"
  };

  handleChangeIdPedido = event => {
    this.setState({
      id: event.target.value
    });
    console.log(this.state.id);
  };

  handleSubmit = event => {
    const id = this.state.id;

    axios.put("http://localhost:8081/dadosPedido", { id }).then(res => {
      this.setState({
        pedido: res.data.pedido.pedido,
        preco: res.data.pedido.preco,
        status: res.data.pedido.status,
        alteracao: res.data.pedido.updatedAt
      });
    });
  };

  render() {
    return (
      <div id="statusBack">
        <div id="statusBody">
          <Link id="statusVoltar" to="/">
            ↩ Voltar
          </Link>
          <div id="insertCodigo">
            <div>
              <h1 id="statusTituloCodigo">Código do Pedido:</h1>
              <input
                id="statusPesquisa"
                type="text"
                name="idpedido"
                onChange={this.handleChangeIdPedido}
              />
            </div>
            <button
              onClick={this.handleSubmit}
              type="submit"
              id="statusSearchBtn"
            >
              Pesquisar
            </button>
          </div>
          <div id="statusPedidoInfosBack">
            <div id="statusPedidoInfos">
              <h1 id="statusPedidoTitulo">Informações</h1>
              <h1 id="statusPedidoLabel">Pedido:</h1>
              <p id="statusPedidoResultado">{this.state.pedido}</p>
              <h1 id="statusPedidoLabel">Preco:</h1>
              <p id="statusPedidoResultado">{this.state.preco}</p>
              <h1 id="statusPedidoLabel">Status:</h1>
              <p id="statusPedidoResultado">{this.state.status}</p>
              <h1 id="statusPedidoLabel">Ultima Atualização Do Pedido:</h1>
              <p id="statusPedidoResultado">
                {this.state.alteracao
                  .replace("T", "  == ")
                  .replace(/-/g, "/")
                  .replace(".000Z", "")}
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
