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
      <body class="container">
        <InfoPizzaAdminDashboard />
        <h2 class="basic-title text-center">Postagens</h2>
        <div>
          <table class="table table-bordered">
            <div>
              {this.state.posts.map(post => (
                <div id="blocoItem">
                  <Link
                    to={`/feed/postagem/${post.id}`}
                    params={{ id: post.id }}
                  >
                    {" "}
                    {post.titulo}{" "}
                  </Link>{" "}
                  <br />
                  <p id="itemPreco">{post.descricao}</p>
                </div>
              ))}
            </div>
          </table>
        </div>
      </body>
    );
  }
}
