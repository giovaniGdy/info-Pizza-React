import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";

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
        alert("Credenciais Inválidas");
        localStorage.clear()
      }
      if (res.data[0] === "ACCESS_GRANTED_USER_PERMITED") {
        localStorage.setItem("info-Pizza-token-for-login", "THIS_USER_IS_PERMITED");
        localStorage.setItem("info-Pizza-userName-for-login", res.data[1]);
        localStorage.setItem("info-Pizza-senha-for-login", res.data[2]);
        this.props.history.push('/')
      } else {
        alert("Credenciais Inválidas");
        localStorage.clear()
      }
    });
  };

  render() {
    return (
      <div>
        <Link to="/"> Home </Link>
        <form onSubmit={this.handleSubmit}>
          <div>
            Username:
            <input
              type="text"
              name="username"
              onChange={this.handleChangeUser}
            />
          </div>
          <br />
          <div>
            Senha:
            <input
              type="password"
              name="senha"
              onChange={this.handleChangeSenha}
            />
          </div>
          <button type="submit">Logar</button>
        </form>
      </div>
    );
  }
}
