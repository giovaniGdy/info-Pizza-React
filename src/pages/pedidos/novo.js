import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/pedidos/fazerPedido.css";

import PopUp from '../../components/PopupWindows/Pedidos'

export default class novoPedido extends React.Component {
  state = {
    cardapio: [],
    CPFvalidator: false,

    cliente: "",
    telefone: "",
    endereco: "",
    cpf: 0,
    preco: 0,
    pedido: "",
    status: "Pedido Realizado"
  };

  async componentDidMount() {
    await axios.get(`http://localhost:8081/cardapio-listados`).then(res => {
      const cardapio = res.data;
      this.setState({ cardapio });
    });
    localStorage.clear();
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
    let cpf = event.target.value;

    let Soma = 0;
    let Resto;

    if (
      !cpf ||
      cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    ) {
      this.setState({
        CPFvalidator: false
      });
    }

    for (let i = 1; i <= 9; i++) {
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
    }

    if (Resto === 10 || Resto === 11) {
      Resto = 0;
    }
    if (Resto !== parseInt(cpf.substring(9, 10))) {
      this.setState({
        CPFvalidator: false
      });
    }

    Soma = 0;

    for (let i = 1; i <= 10; i++) {
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;
    }

    if (Resto === 10 || Resto === 11) {
      Resto = 0;
    }
    if (Resto !== parseInt(cpf.substring(10, 11))) {
      this.setState({
        CPFvalidator: false
      });
      alert("CPF Inválido!");
    } else {
      this.setState({
        CPFvalidator: true,
        cpf: cpf
      });
      alert("CPF Válido!");
    }

    console.log(this.state.cpf);
  };

  handleChangePedido = event => {
    this.setState({
      pedido: event.target.value
    });
  };

  handleAddProduto = event => {
    const valorItem = parseFloat(event.target.attributes[0].value);
    const nomeItem = event.target.attributes[1].value;
    const valorPedido = parseFloat(this.state.preco);

    const quantItem = parseInt(
      document.getElementById(`span${nomeItem}`).attributes[1].value
    );

    const nItens = (document.getElementById(
      `span${nomeItem}`
    ).attributes[1].value = quantItem + 1);

    localStorage.setItem(nomeItem, nItens);

    let valorTotal = valorItem + valorPedido;

    document.getElementById(`span${nomeItem}`).innerHTML = nItens;

    this.setState({
      preco: valorTotal.toFixed(2)
    });
  };

  handleRemoveProduto = event => {
    const valorItem = parseFloat(event.target.attributes[0].value);
    const nomeItem = event.target.attributes[1].value;
    const valorPedido = parseFloat(this.state.preco);

    const quantItem = parseInt(
      document.getElementById(`span${nomeItem}`).attributes[1].value
    );

    if (quantItem >= 1) {
      const nItens = (document.getElementById(
        `span${nomeItem}`
      ).attributes[1].value = quantItem - 1);

      localStorage.setItem(nomeItem, nItens);

      let valorTotal = valorPedido - valorItem;

      document.getElementById(`span${nomeItem}`).innerHTML = nItens;

      this.setState({
        preco: valorTotal.toFixed(2)
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    this.PopUp()

    if (this.state.CPFvalidator === true) {
      Object.entries(localStorage).map(item => {
        if (item[0].slice(4, 25) !== "info") {
          if (item[1] > 0) {
            const arrayTranform = `x${item[1]} ${item[0]}, `;

            this.setState({
              pedido: (this.state.pedido += arrayTranform)
            });
          }
        }
      });

      const pedido = {
        cliente: this.state.cliente,
        telefone: this.state.telefone,
        endereco: this.state.endereco,
        cpf: this.state.cpf,
        pedido: this.state.pedido,
        preco: this.state.preco,
        status: "Pedido Realizado"
      };

      console.log(pedido);

      axios.post("http://localhost:8081/pedidos", { pedido }).then(res => {
        if (res.data.status === "Pedido Realizado") {
          alert("Pedido Realizado Com Sucesso!");
          this.props.history.push("/");
          alert(`Este é o seu Número de Pedido!
          --> ${res.data.id} <--
          Você pode utiliza-lo para ver o andamento do seu pedido!
          `)
        } else {
          alert("Ops... Não foi possível fazer o pedido, ocorreu algum erro!");
          window.location.reload();
        }
      });
    } else {
      alert(`Seu CPF é inválido!
      Por favor verifique seus dados...
      `)
    }
  };

  render() {
    const imagesUrl = `http://localhost:8081/img/`;
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
                  required
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
                  required
                />
              </div>
              <div>
                <p id="titulosPedido">Endereco:</p>
                <input
                  type="text"
                  name="endereco"
                  id="inputPedido"
                  onChange={this.handleChangeEndereco}
                  required
                />
              </div>
              <div>
                <p id="titulosPedido">CPF:</p>
                <input
                  type="text"
                  name="cpf"
                  id="inputPedido"
                  onBlur={this.handleChangeCPF}
                  minLength="11"
                  maxLength="11"
                  required
                />
              </div>
            </div>
            <div id="cardapio">
              {this.state.cardapio.map(item => (
                <div id="itensCardapio">
                  <p>{item.nome}</p>
                  <br />
                  <img
                    src={`${imagesUrl}${item.imgUrl}`}
                    id="itemImage"
                    alt="item do Cardapio"
                  />
                  <p>{item.descricao}</p>
                  <p id="itemPreco">R$ {item.preco}</p>
                  <label
                    valuePreco={item.preco}
                    valueNome={item.nome}
                    onClick={this.handleRemoveProduto}
                    id="removeButton"
                  >
                    -
                  </label>
                  <span
                    className="quantidadeItem"
                    valueQuantidade={0}
                    id={`span${item.nome}`}
                  >
                    0
                  </span>
                  <label
                    valuePreco={item.preco}
                    valueNome={item.nome}
                    onClick={this.handleAddProduto}
                    id="addButton"
                  >
                    + {this.valueNome}
                  </label>
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
