import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Auth from "../../components/Auth/auth";

import InfoPizzaAdminDashboard from "../dashboard";

export default class feedPosts extends React.Component {
  state = {
    posts: []
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
    await axios.get(`http://localhost:8081/feed`).then(res => {
      const posts = res.data;
      this.setState({ posts });
    });
  }

  render() {
    return (
      <div id="feedListarBack">
        <InfoPizzaAdminDashboard props={"/"}/>
        <div id="feedListarBody">
          <div id="feedPostagensFeitas">
            {this.state.posts.map(post => (
              <div id="feedListarBloco">
                <Link
                  to={`/feed/postagem/${post.id}`}
                  params={{ id: post.id }}
                  id="feedListarTitulo"
                >
                  {post.titulo}
                </Link>
                <p id="feedListarData">
                  {post.updatedAt
                    .replace("T", "  == ")
                    .replace(/-/g, "/")
                    .replace(".000Z", "")}
                </p>
                <p id="feedListarDescricao">{post.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
