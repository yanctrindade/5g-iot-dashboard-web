import { message } from "antd";
import { Cookies } from 'react-cookie';
import axios from 'axios';

const cookies = new Cookies();

class Auth {
  constructor() {
    axios.get('./users.json')
    .then((res)=>{
      this.UserData = res.data;
    }).catch((err)=>{
      console.log(err);
    })

    this.authenticated = false;
    this.user = "";
    this.psswrd = "";
    this.userAcessLevel = false; // false - user / driver, true - admin
    /*
      User can only see public vehicles
      Driver can only see its vehicle and public vehicles
      Admin can see all vehicles
    */
  }

  login(user, psswrd) {
    
    for (let i = 0; i < this.UserData.length; i++){
      if (user === this.UserData[i].userName && psswrd === this.UserData[i].Password)
      {
          message.success('Carregado!', 1.0);
          this.authenticated = true;
          this.user = user;
          this.psswrd = psswrd;
          this.userAcessLevel = this.UserData[i].isAdmin;
          cookies.remove('user');
          cookies.remove('psswrd');
          cookies.remove('UserData');
          cookies.set('user', user, { path: '/' });
          cookies.set('psswrd', psswrd, { path: '/' });
          cookies.set('UserData', this.UserData, { path: '/' });
          break;
      }
      else if (user === this.UserData[i].userName && psswrd !== this.UserData[i].Password)
      {
          message.error('Senha incorreta!', 1.0);
          break;
      }

      if (!this.authenticated && (i + 1) === this.UserData.length)
      {
          message.error('Usuário inexistente!', 1.0);
      }
    }
  }

  logout() {
    cookies.remove('user', { path: '/' });
    cookies.remove('psswrd', { path: '/' });
    this.authenticated = false;
    this.user = "";
    this.psswrd = "";
    this.userAcessLevel = false;
  }

  isAuthenticated() {

    if (!this.authenticated && cookies.get('user') !== undefined &&  cookies.get('psswrd') !== undefined){
  
      this.UserData = cookies.get('UserData');
      
      for (let i = 0; i < this.UserData.length; i++){
          // authenticate user again
          if (cookies.get('user') === this.UserData[i].userName && cookies.get('psswrd') === this.UserData[i].Password){
            this.authenticated = true;
            this.user = this.UserData[i].userName;
            this.psswrd = this.UserData[i].Password;
            this.userAcessLevel = this.UserData[i].isAdmin;
            break;
          }
      }
    }

    if (!this.authenticated){
      cookies.remove('user', { path: '/' });
      cookies.remove('psswrd', { path: '/' });
    }

    return this.authenticated;
  }

  isAdmin(){
    return this.userAcessLevel;
  }

  getUserName(){
    return this.user;
  }
}

export default new Auth();