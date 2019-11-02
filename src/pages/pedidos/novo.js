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
    preco: 0
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

  handlePreco = event => {
    const valorItem = parseFloat(event.target.attributes[0].value)
    const valorPedido = parseFloat(this.state.preco)

    let valorTotal = valorItem + valorPedido

    this.setState({
      preco: valorTotal
    })
  }

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
        <div id="returnDiv">
          <Link id="returnBtn" to="/">
            ↩ Voltar
          </Link>
          <label>R$ {pedido.preco}</label>
          <hr id="linhaDivisoria" />
        </div>
        <form onSubmit={this.handleSubmit}>
          <div id="formPedido">
            <div id="textInputs">
            <div>
              <p id="titulosPedido">Nome:</p>
              <input
                type="text"
                name="cliente"
                id="inputPedido"
                onChange={this.handleChangeCliente}
              />
            </div>
            <div>
              <p id="titulosPedido">Telefone:</p>
              <input
                type="text"
                name="telefone"
                id="inputPedido"
                onChange={this.handleChangeTelefone}
                minLength="9"
                maxLength="9"
              />
            </div>
            <div>
              <p id="titulosPedido">Endereco:</p>
              <input
                type="text"
                name="endereco"
                id="inputPedido"
                onChange={this.handleChangeEndereco}
              />
            </div>
            <div>
              <p id="titulosPedido">CPF:</p>
              <input
                type="text"
                name="cpf"
                id="inputPedido"
                onChange={this.handleChangeCPF}
                minLength="11"
                maxLength="11"
              />
            </div>
            </div>
            <div id="cardapio">
              {this.state.cardapio.map(item => (
                <div id="itensCardapio">
                  <p>{item.nome}</p>
                  <br />
                  <img src={`${item.imgUrl}`} alt="item do Cardapio" />
                  <br />
                  <p>R$ {item.preco}</p> <br />
                  <p> {item.status}</p>
                  <label value={item.preco} onClick={this.handlePreco}> + {item.preco} </label>
                </div>
              ))}
            </div>
          </div>
          <div id="concluirButtonDiv">
            <button id="concluirButton" type="submit">
              Fazer Pedido
            </button>
          </div>
        </form>
      </body>
    );
  }
}
