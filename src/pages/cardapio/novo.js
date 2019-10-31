import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Auth from "../../components/Auth/auth";

import InfoPizzaAdminDashboard from "../dashboard";

export default class novoItem extends React.Component {
  state = {
    nome: "",
    preco: "",
    descricao: "",
    imgUrl: "",
    status: ""
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
      imgUrl: event.target.value
    });
  };
  handleChangeStatus = event => {
    this.setState({
      status: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const item = {
      nome: this.state.nome,
      preco: this.state.preco,
      descricao: this.state.descricao,
      imgUrl: this.state.imgUrl,
      status: this.state.status
    };

    axios.post("http://localhost:8081/cardapio", { item }).then(res => {
      if (res.data === "S") {
        alert("Item Adicionado Ao Cardapio!");
        this.props.history.push("/cardapio");
      } else {
        alert("Ops... Não foi possível fazer o pedido, ocorreu algum erro!");
      }
    });
  };

  render() {
    return (
      <body>
        <InfoPizzaAdminDashboard/>
        <form onSubmit={this.handleSubmit}>
          <div>
            Nome:
            <input type="text" name="nome" onChange={this.handleChangeNome} />
          </div>
          <br />
          <div>
            Preco:
            <input type="text" name="preco" onChange={this.handleChangePreco} />
          </div>
          <br />
          <div>
            Descricao:
            <input
              type="text"
              name="descricao"
              onChange={this.handleChangeDescricao}
            />
          </div>
          <br />
          <div>
            Imagem:
            <input
              type="file"
              name="imgUrl"
              onChange={this.handleChangeImgURL}
            />
          </div>
          <br />
          <div>
            Status
            <select name="status" onChange={this.handleChangeStatus}>
              <option value="Não Listado">Selecione</option>
              <option value="Listado">Listado</option>
              <option value="Não Listado">Não Listado</option>
            </select>
          </div>

          <button type="submit">Fazer Pedido</button>
        </form>
      </body>
    );
  }
}
