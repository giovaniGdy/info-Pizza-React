import React from "react";
import axios from "axios";

import Auth from "../../components/Auth/auth";

import InfoPizzaAdminDashboard from "../dashboard";

export default class infoCardapio extends React.Component {
  state = {
    id: this.props.match.params.id,
    nome: "",
    preco: "",
    descricao: "",
    imgUrl: "",
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
    await axios.get(`http://localhost:8081/cardapio/info/${id}`).then(res => {
      this.setState({
        nome: res.data.item.nome,
        preco: res.data.item.preco,
        descricao: res.data.item.descricao,
        imgUrl: res.data.item.imgUrl,
        status: res.data.item.status
      });
      console.log(this.state.nome);
    });
  }

  handleItemDelete = event => {
    const r = window.confirm(
      "Tem certeza que deseja deletar este item do cardapio? \n\nNão será possível recupera-lo!"
    );
    if (r === true) {
      axios
        .delete(`http://localhost:8081/cardapio/${this.props.match.params.id}`)
        .then(res => {
          if (res.data === "S") {
            alert("Pedido Deletado Com Sucesso!");
            this.props.history.push("/cardapio");
          } else {
            alert("Ops... Não foi possível deletar, ocorreu algum erro!");
          }
        });
    }
  };

  handleChangeNome = event => {
    this.setState({
      nome: event.target.value
    });
  };
  handleChangePreco = event => {
    this.setState({
      preco: event.target.value
    });
  };
  handleChangeDescricao = event => {
    this.setState({
      descricao: event.target.value
    });
  };
  handleChangeStatus = event => {
    this.setState({
      status: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const id = this.state.id;

    const item = {
      id: this.state.id,
      nome: this.state.nome,
      preco: this.state.preco,
      descricao: this.state.descricao,
      imgUrl: this.state.imgUrl,
      status: this.state.status
    };

    axios.put(`http://localhost:8081/cardapio/${id}`, { item }).then(res => {
      if (res.data === "S") {
        alert("Item Alterado Com Sucesso!");
        this.props.history.push("/cardapio");
      } else {
        alert("Ops... Não foi possível fazer o pedido, ocorreu algum erro!");
      }
    });
  };

  render() {
    const item = this.state;
    const imagesUrl = `http://localhost:8081/img/`;
    return (
      <div id="cardapioInfoBack">
        <InfoPizzaAdminDashboard />
        <div id="cardapioInfoBody">
          <form onSubmit={this.handleSubmit} id="cardapioInfoForm">
            <div>
              <p id="cardapioInfoTitulo">Nome: </p>
              <input
                type="text"
                name="nome"
                value={item.nome}
                id="cardapioInfoInputs"
                onChange={this.handleChangeNome}
                required
              />
            </div>
            <div>
              <p id="cardapioInfoTitulo">Preco: </p>
              <input
                type="text"
                name="preco"
                value={item.preco}
                id="cardapioInfoInputs"
                onChange={this.handleChangePreco}
                required
              />
            </div>
            <div>
              <p id="cardapioInfoTitulo">Descrição: </p>
              <input
                type="text"
                name="descricao"
                value={item.descricao}
                id="cardapioInfoInputs"
                onChange={this.handleChangeDescricao}
                required
              />
            </div>
            <div>
              <p id="cardapioInfoTitulo">Imagem:</p>
              <img
                src={`${imagesUrl}${item.imgUrl}`}
                id="cardapioInfoImg"
                alt="item do Cardapio"
              />
            </div>
            <div>
              <p id="cardapioInfoTitulo">Status: </p>
              <select
                name="status"
                id="cardapioInfoStatusSelect"
                onChange={this.handleChangeStatus}
              >
                <option value={item.status} disabled selected>
                  Selecione
                </option>
                <option value="Listado">Listado</option>
                <option value="Não Listado">Não Listado</option>
              </select>
            </div>

            <button id="cardapioInfoSave" type="submit">
              ✔ Salvar ✔
            </button>
          </form>
          <button
            id="cardapioInfoDelete"
            type="submit"
            onClick={this.handleItemDelete}
          >
            ✖ Deletar ✖
          </button>
        </div>
      </div>
    );
  }
}
