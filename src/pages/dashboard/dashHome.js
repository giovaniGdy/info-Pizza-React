import React from "react";

import DashBack from "./DashboardBack";
import InfoPizzaAdminDashboard from "./index";

export default class dashPage extends React.Component {
  render() {
    return <div>
        <InfoPizzaAdminDashboard />
        <DashBack />
    </div>;
  }
}
