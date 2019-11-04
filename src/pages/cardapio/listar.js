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
    return (
      <body class="formPedido">
        <InfoPizzaAdminDashboard />
        <div>
          <h2 class="basic-title text-center">cardapio</h2>
          <div>
            <table class="table table-bordered">
              <div>
                {this.state.cardapio.map(item => (
                  <div id="blocoItem">
                    <Link
                      to={`/cardapio/item-info/${item.id}`}
                      params={{ id: item.id }}
                    >
                      {" "}
                      {item.nome}{" "}
                    </Link>{" "}
                    <br />
                    <img
                      src={`${item.imgUrl}`}
                      id="itemImg"
                      alt="item do Cardapio"
                    />
                    <img src="localhost:8081/img/3.jpg" alt="aaaa"></img>
                    <br />
                    <p id="itemPreco">R$ {item.preco}</p> <br />
                    <p id="itemStatus"> {item.status}</p>
                  </div>
                ))}
              </div>
            </table>
          </div>
        </div>
      </body>
    );
  }
}
