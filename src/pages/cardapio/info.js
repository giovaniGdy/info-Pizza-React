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
    });
  }

  handleItemDelete = event => {
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
    const id = this.state.id;
    event.preventDefault();

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
    return (
      <div>
        <InfoPizzaAdminDashboard />
        <form onSubmit={this.handleSubmit}>
          <div>
            Nome:
            <input
              type="text"
              name="nome"
              placeholder={item.nome}
              onChange={this.handleChangeNome}
            />
          </div>
          <br />
          <div>
            Preco:
            <input
              type="text"
              name="preco"
              placeholder={item.preco}
              onChange={this.handleChangePreco}
            />
          </div>
          <br />
          <div>
            Descricao:
            <input
              type="text"
              name="descricao"
              placeholder={item.descricao}
              onChange={this.handleChangeDescricao}
            />
          </div>
          <br />
          <div>
            Imagem:
            <input
              type="file"
              name="imgUrl"
              placeholder={item.imgUrl}
              onChange={this.handleChangeImgURL}
            />
          </div>
          <br />
          <div>
            Status
            <select name="status" onChange={this.handleChangeStatus}>
              <option value={item.status}>Selecione</option>
              <option value="Listado">Listado</option>
              <option value="Não Listado">Não Listado</option>
            </select>
          </div>

          <button type="submit">Salvar</button>
        </form>
        <button type="submit" onClick={this.handleItemDelete}>
          Deletar Pedido
        </button>
      </div>
    );
  }
}
