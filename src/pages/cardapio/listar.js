import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Auth from "../../components/Auth/auth";

import InfoPizzaAdminDashboard from "../dashboard";

export default class Cardapio extends React.Component {
  state = {
    cardapio: []
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
    await axios.get(`http://localhost:8081/cardapio`).then(res => {
      const cardapio = res.data;
      this.setState({ cardapio });
    });
  }

  render() {
    const imagesUrl = `http://localhost:8081/img/`;
    return (
      <body id="cardapioListaBack">
        <InfoPizzaAdminDashboard />
        <div id="cardapioListaBody">
          <table>
            <div id="cardapioListaItens">
              {this.state.cardapio.map(item => (
                <div id="itensCardapio">
                  <Link
                    id="cardapioItemTituloLink"
                    to={`/cardapio/item-info/${item.id}`}
                    params={{ id: item.id }}
                  >
                    {item.nome}
                  </Link>
                  <p id="cardapioItemDescricao">{item.descricao}</p>
                  <img
                    src={`${imagesUrl}${item.imgUrl}`}
                    id="cardapioItemImg"
                    alt="item do Cardapio"
                  />
                  <p id="cardapioItemDescricaoPreco">R$ {item.preco}</p>
                  <p id="cardapioItemDescricao"> {item.status}</p>
                </div>
              ))}
            </div>
          </table>
        </div>
      </body>
    );
  }
}
