import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default class info extends React.Component {
  state = {
    id: this.props.match.params.id,
    cliente: "",
    telefone: "",
    endereco: "",
    cpf: "",
    pedido: "",
    status: ""
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    await axios.get(`http://localhost:8081/pedidos/info/${id}`).then(res => {
      this.setState({
          cliente: res.data.pedido.cliente,
          telefone: res.data.pedido.telefone,
          endereco: res.data.pedido.endereco,
          cpf: res.data.pedido.cpf,
          pedido: res.data.pedido.pedido,
          status: res.data.pedido.status,
      });
    });
  }

  handlePedidoDelete = event => {
    axios.delete(`http://localhost:8081/pedidos/${this.props.match.params.id}`).then(res => {
        if (res.data === "Pedido Deletado") {
            alert("Pedido Deletado Com Sucesso!")
            this.props.history.push('/pedidos')
        }  else {
            alert("Ops... Não foi possível deletar, ocorreu algum erro!")
        }
    });
  }

  handleChangeStatus = event => {
    this.setState({
      status: event.target.value
    });
  };

  handleSubmit = event => {
    const id = this.state.id
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
        alert("Ops... Não foi possível fazer o pedido, ocorreu algum erro!")        
    }  else {
        alert("Pedido Atualizado Com Sucesso!")
        this.props.history.push('/pedidos')
    }
    });
  };

  render() {
    const pedido = this.state;
    return (
      <div>
        <Link to="/pedidos"> Home </Link>
        <form onSubmit={this.handleSubmit}>
          <div>
            Nome:
            <label name="cliente"> {pedido.cliente} </label>
          </div>
          <br />
          <div>
            Telefone:
            <label name="telefone"> {pedido.telefone} </label>
          </div>
          <br />
          <div>
            Endereco:
            <label name="endereco"> {pedido.endereco} </label>
          </div>
          <br />
          <div>
            CPF:
            <label name="cpf"> {pedido.cpf} </label>
          </div>
          <br />
          <div>
            Pedido:
            <label name="pedido"> {pedido.pedido} </label>
          </div>
          <br />
          <div>
            Status Atual:
            <label name="pedido"> {pedido.status} </label>
          </div>
          <br />
          <div>
            Alterar Status Para:
            <select name="status" onChange={this.handleChangeStatus}>
              <option value={pedido.status} >
                Selecione
              </option>
              <option value="Pedido Realizado">Pedido Realizado</option>
              <option value="Preparo Iniciado">Preparo Iniciado</option>
              <option value="Saiu P/ Entrega">Saiu P/ Entrega</option>
              <option disabled> ──────────────────── </option>
              <option value="Entregue">Entrege</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <button type="submit">Fazer Pedido</button>
        </form>
        <button type="submit" onClick={this.handlePedidoDelete}>
          Deletar Pedido
        </button>
      </div>
    );
  }
}
