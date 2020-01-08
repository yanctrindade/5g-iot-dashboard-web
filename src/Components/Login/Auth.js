import { message } from "antd";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

class Auth {
  constructor() {
    this.authenticated = false;
    this.user = "";
    this.psswrd = "";
    this.userAcessLevel = 0; // 0 - no acess, 1 - user, 2 - driver, 3 - admin
  }

  login(user, psswrd) {
    if (user === "test" && psswrd === "test")
    {
        message.success('Carregado!', 1.0);
        this.authenticated = true;
        this.user = user;
        this.psswrd = psswrd;
        this.userAcessLevel = 3;
        cookies.remove('user');
        cookies.remove('psswrd');
        cookies.set('user', user, { path: '/' });
        cookies.set('psswrd', psswrd, { path: '/' });
    }
    else if (user !== "test")
    {
        message.error('Usuário inexistente!', 1.0);
    }
    else
    {
        message.error('Senha incorreta!', 1.0);
    }
  }

  logout() {
    cookies.remove('user', { path: '/' });
    cookies.remove('psswrd', { path: '/' });
    this.authenticated = false;
    this.user = "";
    this.psswrd = "";
    this.userAcessLevel = 0;
  }

  isAuthenticated() {
    if (!this.authenticated && cookies.get('user') !== undefined &&  cookies.get('psswrd') !== undefined){
      // authenticate user again
      if (cookies.get('user') === "test" && cookies.get('psswrd') === "test"){
        this.authenticated = true;
        this.user = cookies.get('user');
        this.psswrd = cookies.get('psswrd');
        this.userAcessLevel = 3;
      }
      else{
        cookies.remove('user', { path: '/' });
        cookies.remove('psswrd', { path: '/' });
      }
    }

    return this.authenticated;
  }

  userAcessLevel(){
    return this.userAcessLevel;
  }
}

export default new Auth();