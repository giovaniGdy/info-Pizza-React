import React from "react";
import axios from "axios";


import Auth from "../../components/Auth/auth";

import InfoPizzaAdminDashboard from "../dashboard";

export default class novaPublicacao extends React.Component {
  state = {
    titulo: "",
    descricao: ""
  };

  async componentDidMount() {
    const r = await Auth();
    if (r === true) {
    } else {
      this.props.history.push("/");
    }
  }

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
    event.preventDefault();

    const post = {
      titulo: this.state.titulo,
      descricao: this.state.descricao
    };

    axios.post("http://localhost:8081/feed", { post }).then(res => {
      if (res.data === "S") {
        alert("Postagem Feita!");
        this.props.history.push("/feed-posts");
      } else {
        alert("Ops... Não foi possível postar, ocorreu algum erro!");
      }
    });
  };

  render() {
    return (
      <div>
        <InfoPizzaAdminDashboard/>
        <form onSubmit={this.handleSubmit}>
          <div>
            Título:
            <input type="text" name="titulo" onChange={this.handleChangeTitulo} />
          </div> <br/>
          <div>
            Descrição:
            <input type="text" name="descricao" onChange={this.handleChangeDescricao} />
          </div>
        <button type="submit">Publicar Postagem</button>
        </form>
      </div>
    );
  }
}
