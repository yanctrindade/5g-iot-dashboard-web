import { message } from "antd";

export const checkCredentials = (user, psswrd) => {
    if (user === "test" && psswrd === "test")
    {
        message.success('Carregado!', 1.0);
        return true;
    }
    else if (user !== "test")
    {
        message.error('Usuário inexistente!', 1.0);
        return false;
    }
    else
    {
        message.error('Senha incorreta!', 1.0);
        return false;
    }
};

export const auth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true
      setTimeout(cb, 100)
    },
    signout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100)
    }
  }