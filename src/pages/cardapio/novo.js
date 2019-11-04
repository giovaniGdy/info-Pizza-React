import React from "react";
import axios from "axios";

import Auth from "../../components/Auth/auth";

import InfoPizzaAdminDashboard from "../dashboard";

import "../styles/cardapio/cadastrar.css"

export default class novoItem extends React.Component {
  state = {
    nome: "",
    preco: "",
    descricao: "",
    image: null,
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

    data.append('nome', this.state.nome)
    data.append('descricao', this.state.descricao)
    data.append('preco', this.state.preco)
    data.append('image', this.state.image)
    data.append('status', this.state.status)

    for (let key of data.entries()) {
      console.log(key)
    } 
    
    
    await axios.post("http://localhost:8081/cardapio-img", data ).then(res => {
      console.log(res.statusText)
    
    // if (res.data === "S") {
      //   alert("Item Adicionado Ao Cardapio!");
      //   this.props.history.push("/cardapio");
      // } else {
      //   alert("Ops... Não foi possível fazer o pedido, ocorreu algum erro!");
      // }
    });
  };

  render() {
    return (
      <body>
        <InfoPizzaAdminDashboard/>
        <div id="formCardapio">
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
              name="image"
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
        </div>
      </body>
    );
  }
}
