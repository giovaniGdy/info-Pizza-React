import React from "react";
import axios from "axios";

import Auth from "../../components/Auth/auth";

import InfoPizzaAdminDashboard from "../dashboard";

export default class loginAlt extends React.Component {
  state = {
    usernameAtual: localStorage.getItem("info-Pizza-userName-for-login"),
    senhaAtual: localStorage.getItem("info-Pizza-senha-for-login"),
    correctPassword: false,

    spanSenha: '',

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
        })
    } else {
        this.setState({
            spanSenha: "Senha incorreta"
        })
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
    }

    await axios.put("http://localhost:8081/userAlt", {newUserData}).then(res => {
        console.log(res)
    })
    } else {
        alert("A senha está incorreta!")
    }
  }

  render() {
    return (
      <body>
        <InfoPizzaAdminDashboard />
        <form onSubmit={this.handleSubmit}>
          <div id="formPedido">
            <div id="textInputs">
              <div>
                <p id="titulosPedido">Username:</p>
                <input
                  type="text"
                  name="username"
                  id="inputPedido"
                  placeholder={this.state.username}
                  onChange={this.handleChangeUsername}
                  required
                />
              </div>
              <div>
                <p id="titulosPedido">Senha Atual:</p>
                <input
                  type="password"
                  name="senhaAtual"
                  id="inputPedido"
                  onBlur={this.handleChangeSenhaAtual}
                  required
                />
                <span>{this.state.spanSenha}</span>
              </div>
              <div>
                <p id="titulosPedido">Nova Senha:</p>
                <input
                  type="password"
                  name="novaSenha"
                  id="inputPedido"
                  onChange={this.handleChangeNovaSenha}
                  required
                />
              </div>
              <div>
                <p id="titulosPedido">Nome:</p>
                <input
                  type="text"
                  name="nome"
                  id="inputPedido"
                  placeholder={this.state.nome}
                  onChange={this.handleChangeNome}
                  required
                />
              </div>
              <div>
                <p id="titulosPedido">Telefone:</p>
                <input
                  type="text"
                  name="telefone"
                  id="inputPedido"
                  placeholder={this.state.telefone}
                  onChange={this.handleChangeTelefone}
                  minLength="9"
                  maxLength="9"
                  required
                />
              </div>
              <div>
                <p id="titulosPedido">Endereco:</p>
                <input
                  type="text"
                  name="endereco"
                  id="inputPedido"
                  placeholder={this.state.endereco}
                  onChange={this.handleChangeEndereco}
                  required
                />
              </div>
              <div>
                <p id="titulosPedido">CPF:</p>
                <input
                  type="text"
                  name="cpf"
                  id="inputPedido"
                  onChange={this.handleChangeCPF}
                  minLength="11"
                  maxLength="11"
                  placeholder={this.state.cpf}
                  required
                />
              </div>
              <div>
                <p id="titulosPedido">Tipo:</p>
                <input
                  type="text"
                  name="type"
                  id="inputPedido"
                  placeholder={this.state.type}
                  onChange={this.handleChangeType}
                  required
                />
              </div>
              <div>
                <p id="titulosPedido">Ultima Alteração Foi Feita Em::</p>
                <label>{this.state.alteracao}</label>
              </div>
            </div>
          </div>
          <div id="concluirButtonDiv">
            <button id="concluirButton" type="submit">
              Fazer Pedido
            </button>
          </div>
        </form>
      </body>
    );
  }
}
