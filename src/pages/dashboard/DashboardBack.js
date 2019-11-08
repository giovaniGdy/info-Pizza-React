import React from "react";

export default class dashBack extends React.Component {
  
  render() {
    const infoPizzaLogo = "http://localhost:8081/img/logoInfoPizza.png";
    return (
        <div id="dashUnderBack">
            <div id="dashUnderBody">
                <p id="dashUnderEscrita">Trabalho em Pogresso...</p>
                <img src={infoPizzaLogo} id="dashUnderImg" alt="infoPizza Logo"></img>
            </div>
        </div>
    );
  }
}
