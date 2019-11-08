import React from "react";
import axios from "axios";

import Auth from "../../components/Auth/auth";

import InfoPizzaAdminDashboard from "../dashboard";

export default class info extends React.Component {
  state = {
    id: this.props.match.params.id,
    cliente: "",
    telefone: "",
    endereco: "",
    cpf: "",
    pedido: "",
    preco: "",
    status: ""
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
    const id = this.props.match.params.id;
    await axios.get(`http://localhost:8081/pedidos/info/${id}`).then(res => {
      this.setState({
        cliente: res.data.pedido.cliente,
        telefone: res.data.pedido.telefone,
        endereco: res.data.pedido.endereco,
        cpf: res.data.pedido.cpf,
        pedido: res.data.pedido.pedido,
        preco: res.data.pedido.preco,
        status: res.data.pedido.status
      });
    });
  }

  handlePedidoDelete = event => {
    const r = window.confirm(
      "Tem certeza que deseja deletar este pedido? \n\nNão será possível recupera-lo!"
    );
    if (r === true) {
      axios
        .delete(`http://localhost:8081/pedidos/${this.props.match.params.id}`)
        .then(res => {
          if (res.data === "S") {
            alert("Pedido Deletado Com Sucesso!");
            this.props.history.push("/pedidos");
          } else {
            alert("Ops... Não foi possível deletar, ocorreu algum erro!");
          }
        });
    }
  };

  handleChangeStatus = event => {
    this.setState({
      status: event.target.value
    });
  };

  handleSubmit = event => {
    const id = this.state.id;
    event.preventDefault();

    const pedido = {
      id: this.state.id,
      cliente: this.state.cliente,
      telefone: this.state.telefone,
      endereco: this.state.endereco,
      cpf: this.state.cpf,
      pedido: this.state.pedido,
      status: this.state.status
    };

    axios.put(`http://localhost:8081/pedidos/${id}`, { pedido }).then(res => {
      if (res.data === "Erro") {
        alert("Ops... Não foi possível fazer o pedido, ocorreu algum erro!");
      } else {
        alert("Pedido Atualizado Com Sucesso!");
        this.props.history.push("/pedidos");
      }
    });
  };

  render() {
    const pedido = this.state;
    return (
      <div id="pedidoInfoBack">
        <InfoPizzaAdminDashboard />
        <div id="pedidoInfoBody">
          <form onSubmit={this.handleSubmit} id="pedidoInfoForm">
            <div>
              <h1 id="pedidoInfoTitulo">Nome:</h1>
              <p name="cliente" id="pedidoInfoInfo">
                {" "}
                {pedido.cliente}{" "}
              </p>
            </div>
            <div>
              <h1 id="pedidoInfoTitulo">Telefone:</h1>
              <p name="telefone" id="pedidoInfoInfo">
                {" "}
                {pedido.telefone}{" "}
              </p>
            </div>
            <div>
              <h1 id="pedidoInfoTitulo">Endereco:</h1>
              <p name="endereco" id="pedidoInfoInfo">
                {" "}
                {pedido.endereco}{" "}
              </p>
            </div>
            <div>
              <h1 id="pedidoInfoTitulo">CPF:</h1>
              <p name="cpf" id="pedidoInfoInfo">
                {" "}
                {pedido.cpf}{" "}
              </p>
            </div>
            <div>
              <h1 id="pedidoInfoTitulo">Pedido:</h1>
              <p name="pedido" id="pedidoInfoInfo">
                {" "}
                {pedido.pedido}{" "}
              </p>
            </div>
            <div>
              <h1 id="pedidoInfoTitulo">Preco:</h1>
              <p name="valor" id="pedidoInfoInfo">
                R$ {pedido.preco}{" "}
              </p>
            </div>
            <div>
              <h1 id="pedidoInfoTitulo">Status Atual:</h1>
              <p name="pedido" id="pedidoInfoInfo">
                {" "}
                {pedido.status}{" "}
              </p>
            </div>
            <div>
              <h1 id="pedidoInfoTitulo">Alterar Status Para:</h1>
              <select
                name="status"
                id="pedidoInfoAlterarStatus"
                onChange={this.handleChangeStatus}
              >
                <option value={pedido.status}>Selecione</option>
                <option value="Pedido Realizado">Pedido Realizado</option>
                <option value="Preparo Iniciado">Preparo Iniciado</option>
                <option value="Saiu P/ Entrega">Saiu P/ Entrega</option>
                <option disabled> ──────────────────── </option>
                <option value="Entregue">Entrege</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
            <button id="pedidoInfoSave" type="submit">
              ✔ Salvar ✔
            </button>
          </form>
          <button
            type="submit"
            id="pedidoInfoDelete"
            onClick={this.handlePedidoDelete}
          >
            ✖ Deletar ✖
          </button>
        </div>
      </div>
    );
  }
}
