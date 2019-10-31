import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/pedidos/fazerPedido.css";

export default class novoPedido extends React.Component {
  state = {
    cardapio: [],
    cliente: "",
    telefone: "",
    endereco: "",
    cpf: "",
    pedido: "",
    status: "Pedido Realizado",
    
    preco: "00,00"
  };

  async componentDidMount() {
    await axios.get(`http://localhost:8081/cardapio`).then(res => {
      const cardapio = res.data;
      this.setState({ cardapio });
    });
  }

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
        alert("Pedido Realizado Com Sucesso!");
        this.props.history.push("/pedidos");
      } else {
        alert("Ops... Não foi possível fazer o pedido, ocorreu algum erro!");
      }
    });
  };

  render() {
    const pedido = this.state;
    return (
      <body>
        <div id="returnBtnDiv">
          <Link id="returnBtn" to="/">
            {" "}
            ↩ Voltar{" "}
          </Link>
          <label id="precoTotal">R$ {pedido.preco}</label>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div id="margemInterna">
            <div>
              <p id="titulos">Nome:</p>
              <input
                type="text"
                name="cliente"
                id="inputs"
                onChange={this.handleChangeCliente}
              />
            </div>
            <br />
            <div>
              <p id="titulos">Telefone:</p>
              <input
                type="text"
                name="telefone"
                id="inputs"
                onChange={this.handleChangeTelefone}
                minLength="9"
                maxLength="9"
              />
            </div>
            <br />
            <div>
              <p id="titulos">Endereco:</p>
              <input
                type="text"
                name="endereco"
                id="inputs"
                onChange={this.handleChangeEndereco}
              />
            </div>
            <br />
            <div>
              <p id="titulos">CPF:</p>
              <input
                type="text"
                name="cpf"
                id="inputs"
                onChange={this.handleChangeCPF}
                minLength="11"
                maxLength="11"
              />
            </div>
            <br />
            <div id="itensCardapio">
              {this.state.cardapio.map(item => (
                <div id="blocoItem">
                  <Link
                    to={`/cardapio/item-info/${item.id}`}
                    params={{ id: item.id }}
                  >
                    {item.nome}
                  </Link>
                  <br />
                  <img
                    src={`${item.imgUrl}`}
                    id="itemImg"
                    alt="item do Cardapio"
                  />
                  <br />
                  <p id="itemPreco">R$ {item.preco}</p> <br />
                  <p id="itemStatus"> {item.status}</p>
                </div>
              ))}
            </div>

            <button type="submit">Fazer Pedido</button>
          </div>
        </form>
      </body>
    );
  }
}
