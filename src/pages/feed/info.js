import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import Auth from "../../components/Auth/auth";

import InfoPizzaAdminDashboard from "../dashboard";

export default class infoPostagem extends React.Component {
  state = {
    id: this.props.match.params.id,
    titulo: "",
    descricao: ""
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
    await axios.get(`http://localhost:8081/feed/info/${id}`).then(res => {
      this.setState({
        titulo: res.data.post.titulo,
        descricao: res.data.post.descricao
      });
    });
  }

  handleFeedDelete = event => {
    axios
      .delete(`http://localhost:8081/feed/${this.props.match.params.id}`)
      .then(res => {
        if (res.data === "S") {
          alert("Pedido Deletado Com Sucesso!");
          this.props.history.push("/feed-posts");
        } else {
          alert("Ops... Não foi possível deletar, ocorreu algum erro!");
        }
      });
  };

  handleChangeTitulo = event => {
    this.setState({
      titulo: event.target.value
    });
  };
  handleChangeDescricao = event => {
    this.setState({
      descricao: event.target.value
    });
  };

  handleSubmit = event => {
    const id = this.state.id;
    event.preventDefault();

    const post = {
      titulo: this.state.titulo,
      descricao: this.state.descricao
    };

    axios.put(`http://localhost:8081/feed/${id}`, { post }).then(res => {
      if (res.data === "Erro") {
        alert("Ops... Não foi possível postar, ocorreu algum erro!");
      } else {
        alert("Postagem Feita!");
        this.props.history.push("/feed-posts");
      }
    });
  };

  render() {
    const post = this.state;
    return (
      <div>        
        <InfoPizzaAdminDashboard />
        <form onSubmit={this.handleSubmit}>
          <div>
            Título:
            <input
              type="text"
              name="titulo"
              value={post.titulo}
              onChange={this.handleChangeTitulo}
            />
          </div>{" "}
          <br />
          <div>
            Descrição:
            <input
              type="text"
              name="descricao"
              value={post.descricao}
              onChange={this.handleChangeDescricao}
            />
          </div>
          <button type="submit">Publicar Postagem</button>
        </form>
        <button type="submit" onClick={this.handleFeedDelete}>
          Deletar Postagem
        </button>
      </div>
    );
  }
}
