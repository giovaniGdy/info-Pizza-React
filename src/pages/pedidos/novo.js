import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default class novoPedido extends React.Component {
  state = {
    cliente: "",
    telefone: "",
    endereco: "",
    cpf: "",
    pedido: "",
    status: "Pedido Realizado"
  };

  handleChangeCliente = event => {
    this.setState({
      cliente: event.target.value
    });
  };
  handleChangeTelefone = event => {
    this.setState({
      telefone: event.target.value
    });
  };
  handleChangeEndereco = event => {
    this.setState({
      endereco: event.target.value
    });
  };
  handleChangeCPF = event => {
    this.setState({
      cpf: event.target.value
    });
  };
  handleChangePedido = event => {
    this.setState({
      pedido: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const pedido = {
      cliente: this.state.cliente,
      telefone: this.state.telefone,
      endereco: this.state.endereco,
      cpf: this.state.cpf,
      pedido: this.state.pedido,
      status: "Pedido Realizado"
    };

    axios.post("http://localhost:8081/pedidos", { pedido }).then(res => {
      if (res.data === "Pedido Realizado Com Sucesso!") {
        alert("Pedido Realizado Com Sucesso!")
        this.props.history.push('/pedidos')
    }  else {
        alert("Ops... Não foi possível fazer o pedido, ocorreu algum erro!")
    }
    });
  };

  render() {
    return (
      <div>
        <Link to="/"> Home </Link>
        <form onSubmit={this.handleSubmit}>
          <div>
            Nome:
            <input
              type="text"
              name="cliente"
              onChange={this.handleChangeCliente}
            />
          </div>
          <br />
          <div>
            Telefone:
            <input
              type="text"
              name="telefone"
              onChange={this.handleChangeTelefone}
              minLength="9"
              maxLength="9"
            />
          </div>
          <br />
          <div>
            endereco:
            <input
              type="text"
              name="endereco"
              onChange={this.handleChangeEndereco}
            />
          </div>
          <br />
          <div>
            CPF:
            <input
              type="text"
              name="cpf"
              onChange={this.handleChangeCPF}
              minLength="11"
              maxLength="11"
            />
          </div>
          <br />
          <div>
            O que Deseja?
            <input
              type="text"
              name="pedido"
              onChange={this.handleChangePedido}
            />
          </div>

          <button type="submit">Fazer Pedido</button>
        </form>
      </div>
    );
  }
}
