import React from "react";

import "../../../pages/styles/popups/styles.css"

class PopUp extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { data } = this.props;

    return( <div id="popup">
        <p>aaaaaaaaaaaa</p>
        <p>aaaaaaaaaaaa</p>
        <p>aaaaaaaaaaaa</p>
        <p>aaaaaaaaaaaa</p>
        <p>aaaaaaaaaaaa</p>
    </div>
    )
  }
}
export default PopUp;