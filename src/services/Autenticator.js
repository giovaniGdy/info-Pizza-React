export const confirmIsLoged = () => {
  const loginToken = localStorage.getItem("info-Pizza-token-for-login");
  const loginUser = localStorage.getItem("info-Pizza-userName-for-login");
  const loginPass = localStorage.getItem("info-Pizza-senha-for-login");

  if ((loginToken === null) | (loginUser === null) | (loginPass === null)) {
    // this.props.history.push("/"); fazer um redirect
    localStorage.clear();
  }
};
