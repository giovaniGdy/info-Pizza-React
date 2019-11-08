import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Site extends React.Component {
  state = {
    feed: []
  };

  componentDidMount() {
    axios.get("http://localhost:8081/feed").then(res => {
      const feed = res.data;
      this.setState({
        feed
      });
    });
  }

  render() {
    const unifeobLogo = "http://localhost:8081/img/logoUnifeob.png";
    const pizzariaLogo = "http://localhost:8081/img/logoPizza.jpg";
    return (
      <body id="siteBack">
        <div id="siteBody">
          <div id="siteLinks">
            <Link id="siteLink" to="/novo-pedido">
              Fazer Pedido
            </Link>
            <Link id="siteLink" to="/verificar-status">
              Status Pedido
            </Link>
            <Link id="siteLink" to="/login">
              Acesso a Sistemas
            </Link>
          </div>
          <div>
            <img src={pizzariaLogo} alt="pizzaLogo" id="pizzaLogoIndex" />
            <h1>ULTIMAS NOTÍCIAS</h1>
            {this.state.feed.map(post => (
              <div id="siteFeedBlock">
                <p id="sitePostTitulo">{post.titulo}</p>
                <p id="sitePostData">
                  {post.updatedAt
                    .replace("T", " | ")
                    .replace(/-/g, "/")
                    .replace(".000Z", "")}
                </p>
                <p id="sitePostDescricao">{post.descricao}</p>
              </div>
            ))}
          </div>
        </div>
        <footer id="siteFooter">
          <p id="siteEquipe">The Soldiers</p>
          <img src={unifeobLogo} id="unifeobLogoFooter" alt="Unifeob Logo" />
        </footer>
      </body>
    );
  }
}
