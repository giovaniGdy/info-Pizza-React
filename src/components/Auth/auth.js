import axios from 'axios'

export default async function Auth() {
    const loginUser = localStorage.getItem('info-Pizza-userName-for-login');
    const loginPass = localStorage.getItem('info-Pizza-senha-for-login');

    const usuario = {
      username: loginUser,
      senha: loginPass
    };

    const r = await axios.put("http://localhost:8081/logar", { usuario }).then(res => {
      if (res.data === "Invalido") {
        return false
      } else {
        return true
      }
    })
      return r
  }