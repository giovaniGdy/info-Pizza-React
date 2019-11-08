import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        CPFvalidator: false,
        CPFMessage: "✖ CPF Inválido!"
      });
    } else {
      this.setState({
        CPFvalidator: true,
        cpf: cpf,
        CPFMessage: "✔ CPF Válido!"
      });
    }
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

      axios.post("http://localhost:8081/pedidos", { pedido }).then(res => {
        if (res.data.status === "Pedido Realizado") {
          toast(
            <div>
              Pedido Realizado! <br />
              Este é o Número do seu pedido: <br />
              <p> {res.data.id} </p>
              Você pode utiliza-lo para verificar o andamento do seu pedido!
              <br />
              <br />
              <a href="/verificar-status">Clique Aqui</a>
            </div>,
            {
              className: "popUp",
              position: "top-center",
              autoClose: false
            }
          );
        } else {
          toast(
            <div>
              Opss! Ocoreu algum erro... <br />
              Por favor, recarregue a página! <br />
              <br />
              <p>
                Se isso continuar a acontecer <br />
                entre em contato com a Pizzaria.
              </p>
            </div>,
            {
              className: "popUpError",
              position: "top-center",
              autoClose: false
            }
          );
        }
      });
    } else {
      toast(
        <div>
          Os dados inseridos não estão corretos! <br />
          <br />
          Por Favor, verifique-os
        </div>,
        {
          className: "popUpError",
          position: "top-center",
          autoClose: false
        }
      );
    }
  };

  returnHome = event => {};
  reloadPage() {
    this.location.reload();
  }

  render() {
    const imagesUrl = `http://localhost:8081/img/`;
    const pedido = this.state;
    return (
      <body id="fazerPedidoBack">
        <div id="returnDiv">
          <Link id="returnBtn" to="/">
            ↩ Voltar
          </Link>
          <p id="precoTotal">R$ {pedido.preco}</p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div id="formPedido">
            <div id="popUp">
              <ToastContainer />
            </div>
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
                <span>{this.state.CPFMessage}</span>
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
                    ⋁
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
                    ⋀ {this.valueNome}
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
