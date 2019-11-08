import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Auth from "../../components/Auth/auth";

import InfoPizzaAdminDashboard from "../dashboard";

export default class novoItem extends React.Component {
  state = {
    nome: 'Item',
    preco: "",
    descricao: "",
    image: null,
    status: "",

    loaded: 0
  };

  async componentDidMount() {
    const r = await Auth();
    if (r === true) {
    } else {
      this.props.history.push("/");
    }
  }

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
  handleChangeImgURL = event => {
    this.setState({
      image: event.target.files[0]
    });
  };
  handleChangeStatus = event => {
    this.setState({
      status: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    let data = new FormData();

    data.append("nome", this.state.nome);
    data.append("descricao", this.state.descricao);
    data.append("preco", this.state.preco);
    data.append("image", this.state.image);
    data.append("status", this.state.status);

    await axios
      .post("http://localhost:8081/cardapio-img")
      .then(toast(<div>Item Adicionado Com Sucesso!</div>));
  };

  render() {
    return (
      <body id="cardapioAddBack">
        <InfoPizzaAdminDashboard />
        <div id="cardapioAddBody">
          <ToastContainer />
          <form onSubmit={this.handleSubmit}>
            <div>
              <p id="cardapioAddTitulo">Nome:</p>
              <input
                type="text"
                name="nome"
                id="cardapioAddInputs"
                onChange={this.handleChangeNome}
                required
              />
            </div>
            <div>
              <p id="cardapioAddTitulo">Preco:</p>
              <input
                type="text"
                name="preco"
                id="cardapioAddInputs"
                onChange={this.handleChangePreco}
                required
              />
            </div>
            <div>
              <p id="cardapioAddTitulo">Descrição:</p>
              <input
                type="text"
                name="descricao"
                id="cardapioAddInputs"
                onChange={this.handleChangeDescricao}
                required
              />
            </div>
            <div>
              <p id="cardapioAddTitulo">Imagem:</p>
              <input
                type="file"
                name="image"
                id="cardapioAddInputsImg"
                onChange={this.handleChangeImgURL}
                required
              />
            </div>
            <div>
              <p id="cardapioAddTitulo">Status:</p>
              <select
                name="status"
                id="cardapioAddStatusSelect"
                onChange={this.handleChangeStatus}
              >
                <option value="Não Listado">Selecione</option>
                <option value="Listado">Listado</option>
                <option value="Não Listado">Não Listado</option>
              </select>
            </div>

            <button id="cardapioSaveBtn" type="submit">
              Fazer Pedido
            </button>
          </form>
        </div>
      </body>
    );
  }
}
