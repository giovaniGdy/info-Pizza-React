import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Auth from "../../components/Auth/auth";

import InfoPizzaAdminDashboard from "../dashboard";

export default class loginAlt extends React.Component {
  state = {
    usernameAtual: localStorage.getItem("info-Pizza-userName-for-login"),
    senhaAtual: localStorage.getItem("info-Pizza-senha-for-login"),
    correctPassword: false,

    id: 0,
    username: localStorage.getItem("info-Pizza-userName-for-login"),
    senha: localStorage.getItem("info-Pizza-senha-for-login"),
    nome: "",
    endereco: "",
    telefone: "",
    cpf: "",
    type: "",
    alteracao: ""
  };

  async componentDidMount() {
    const r = await Auth();
    if (r === true) {
      this.loadUserInfo();
    } else {
      this.props.history.push("/");
    }
  }

  async loadUserInfo() {
    const usuario = {
      username: this.state.username,
      senha: this.state.senha
    };

    axios.post("http://localhost:8081/userAlt", { usuario }).then(res => {
      console.log(res.data.id);
      this.setState({
        id: res.data.id,
        nome: res.data.nome,
        endereco: res.data.endereco,
        telefone: res.data.telefone,
        cpf: res.data.cpf,
        type: res.data.type,
        alteracao: res.data.updatedAt
      });
    });
  }

  handleChangeUsername = event => {
    this.setState({
      username: event.target.value
    });
  };
  handleChangeSenhaAtual = event => {
    if (event.target.value === this.state.senhaAtual) {
      this.setState({
        correctPassword: true
      });
    } else {
      toast(
        <div>
          ╳ <br />
          Senha incorreta!
        </div>,
        {
          className: "popUpError",
          position: "top-center",
          autoClose: 3000
        }
      );
    }
  };
  handleChangeNovaSenha = event => {
    this.setState({
      senha: event.target.value
    });
  };
  handleChangeNome = event => {
    this.setState({
      nome: event.target.value
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
  handleChangeType = event => {
    this.setState({
      type: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    if (this.state.correctPassword === true) {
      const newUserData = {
        id: this.state.id,
        user: this.state.username,
        senha: this.state.senha,
        nome: this.state.nome,
        endereco: this.state.endereco,
        cpf: this.state.cpf,
        type: this.state.type
      };

      await axios
        .put("http://localhost:8081/userAlt", { newUserData })
        .then(res => {
          if (res.data === "S") {
            toast(
              <div>
                Dados Salvos!
              </div>,
              {
                className: "popUp",
                position: "top-center",
                autoClose: 3000
              }
            );
          }
        });
    } else {
      toast(
        <div>
          ╳ <br />
          Senha incorreta!
        </div>,
        {
          className: "popUpError",
          position: "top-center",
          autoClose: 3000
        }
      );
    }
  };

  render() {
    return (
      <body id="userAltBack">
        <InfoPizzaAdminDashboard />
        <form id="userAltBody" onSubmit={this.handleSubmit}>
          <ToastContainer />
          <div>
            <p id="userAltTitulo">Username:</p>
            <input
              type="text"
              name="username"
              id="userAltInput"
              value={this.state.username}
              onChange={this.handleChangeUsername}
              required
            />
          </div>
          <div>
            <p id="userAltTitulo">Senha Atual:</p>
            <input
              type="password"
              name="senhaAtual"
              id="userAltInput"
              onBlur={this.handleChangeSenhaAtual}
              required
            />
          </div>
          <div>
            <p id="userAltTitulo">Nova Senha:</p>
            <input
              type="password"
              name="novaSenha"
              id="userAltInput"
              onBlur={this.handleChangeNovaSenha}
              required
            />
          </div>
          <div>
            <p id="userAltTitulo">Nome:</p>
            <input
              type="text"
              name="nome"
              id="userAltInput"
              value={this.state.nome}
              onChange={this.handleChangeNome}
              required
            />
          </div>
          <div>
            <p id="userAltTitulo">Telefone:</p>
            <input
              type="text"
              name="telefone"
              id="userAltInput"
              onChange={this.handleChangeTelefone}
              minLength="9"
              maxLength="9"
              required
            />
          </div>
          <div>
            <p id="userAltTitulo">Endereco:</p>
            <input
              type="text"
              name="endereco"
              id="userAltInput"
              onChange={this.handleChangeEndereco}
              required
            />
          </div>
          <div>
            <p id="userAltTitulo">CPF:</p>
            <input
              type="text"
              name="cpf"
              id="userAltInput"
              onChange={this.handleChangeCPF}
              minLength="11"
              maxLength="11"
              required
            />
          </div>
          <div>
            <p id="userAltTitulo">Tipo:</p>
            <input
              type="text"
              name="type"
              id="userAltInput"
              value={this.state.type}
              onChange={this.handleChangeType}
              required
            />
          </div>
          <div>
            <p id="userAltTitulo">Data da Ultima Alteração:</p>
            <label id="userAltData">
              {this.state.alteracao
                .replace("T", "  == ")
                .replace(/-/g, "/")
                .replace(".000Z", "")}
            </label>
          </div>
          <button id="userAltBtn" type="submit">
            Salvar Dados
          </button>
        </form>
      </body>
    );
  }
}
