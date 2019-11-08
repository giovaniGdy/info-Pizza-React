import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast(<div>Postagem Realizada!</div>, {
          className: "popUp",
          position: "bottom-center",
          autoClose: 2000
        });
      } else {
        toast(
          <div>
            Ops... Não foi possível postar <br />
            ocorreu algum erro!
          </div>,
          {
            className: "popUp",
            position: "bottom-center",
            autoClose: 2000
          }
        );
      }
    });
  };

  render() {
    return (
      <div id="feedAddBack">
        <InfoPizzaAdminDashboard />
        <div id="feedAddBody">
          <div id="popUp">
            <ToastContainer />
          </div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <p id="feedAddTitulo">Título:</p>
              <input
                type="text"
                name="titulo"
                id="feedAddInputs"
                onChange={this.handleChangeTitulo}
                required
              />
            </div>{" "}
            <br />
            <div>
              <p id="feedAddTitulo">Descrição:</p>
              <textarea
                name="descricao"
                cols="50"
                rows="10"
                maxLength="1500"
                id="feedAddInputsDescricao"
                onChange={this.handleChangeDescricao}
              />
            </div>
            <button id="feedSaveBtn" type="submit">
              Publicar Postagem
            </button>
          </form>
        </div>
      </div>
    );
  }
}
