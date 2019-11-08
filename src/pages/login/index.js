import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class LoginScreen extends React.Component {
  state = {
    username: "",
    senha: ""
  };

  handleChangeUser = event => {
    this.setState({
      username: event.target.value
    });
  };
  handleChangeSenha = event => {
    this.setState({
      senha: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const usuario = {
      username: this.state.username,
      senha: this.state.senha
    };

    axios.put("http://localhost:8081/logar", { usuario }).then(res => {
      if (res.data === "Invalido") {
        toast(
          <div>
            ╳ <br />
            Credenciais Inválidas!
          </div>,
          {
            className: "popUpError",
            position: "bottom-center",
            autoClose: 2000
          }
        );
        localStorage.clear();
      } else if (res.data[0] === "ACCESS_GRANTED_USER_PERMITED") {
        localStorage.setItem(
          "info-Pizza-token-for-login",
          "THIS_USER_IS_PERMITED"
        );
        localStorage.setItem("info-Pizza-userName-for-login", res.data[1]);
        localStorage.setItem("info-Pizza-senha-for-login", res.data[2]);
        this.props.history.push("/dashPage");
      }
    });
  };

  render() {
    return (
      <div id="loginBack">
        <div id="loginBody">
          <Link to="/" id="homeBtn">
            ↩ Voltar
          </Link>
          <div id="popUp">
            <ToastContainer />
          </div>
          <form onSubmit={this.handleSubmit} id="loginForm">
            <div>
              <p id="loginTitulos">Username:</p>
              <input
                type="text"
                name="username"
                id="loginInputs"
                onChange={this.handleChangeUser}
              />
            </div>
            <br />
            <div>
              <p id="loginTitulos">Senha:</p>
              <input
                type="password"
                name="senha"
                id="loginInputs"
                onChange={this.handleChangeSenha}
              />
            </div>
            <button type="submit" id="loginBtn">
              Logar
            </button>
          </form>
        </div>
      </div>
    );
  }
}
