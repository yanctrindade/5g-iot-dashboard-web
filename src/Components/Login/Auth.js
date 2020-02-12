import { message } from "antd";
import { Cookies } from 'react-cookie';
import axios from 'axios';

const cookies = new Cookies();

class Auth {
  constructor() {
    axios.get('/users.json')
    .then((res)=>{
      this.UserData = res.data;
    }).catch((err)=>{
      console.log(err);
    })

    this.authenticated = false;
    this.user = "";
    this.psswrd = "";
    this.name = "";
    this.plate = "";
    this.userAcessLevel = false; // false - user / driver, true - admin
    /*
      User can only see public vehicles
      Driver can only see its vehicle and public vehicles
      Admin can see all vehicles
    */
  }

  login(user, psswrd) {
    
    for (let i = 0; i < this.UserData.length; i++){
      if ((user === this.UserData[i].userName || user === this.UserData[i].email) && psswrd === this.UserData[i].password)
      {
        if (this.UserData[i].isApproved){
          message.success('Carregado!', 1.0);
          this.authenticated = true;
          this.user = this.UserData[i].userName;
          this.psswrd = psswrd;
          this.name = this.UserData[i].name;
          this.plate = this.UserData[i].associatedPlate;
          this.userAcessLevel = this.UserData[i].isAdmin;
          cookies.remove('user');
          cookies.remove('psswrd');
          cookies.remove('UserData');
          cookies.set('user', this.UserData[i].userName, { path: '/' });
          cookies.set('psswrd', psswrd, { path: '/' });
          cookies.set('UserData', this.UserData, { path: '/' });
        }
        else {
          message.error('Usuário ainda não aprovado!', 5.0);
        }
          
        break;
      }
      else if ((user === this.UserData[i].userName || user === this.UserData[i].email) && psswrd !== this.UserData[i].password)
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
    this.name = "";
    this.plate = "";
    this.userAcessLevel = false;
  }

  isAuthenticated() {

    if (!this.authenticated && cookies.get('user') !== undefined &&  cookies.get('psswrd') !== undefined){
  
      this.UserData = cookies.get('UserData');
      
      for (let i = 0; i < this.UserData.length; i++){
          // authenticate user again
          if (cookies.get('user') === this.UserData[i].userName && cookies.get('psswrd') === this.UserData[i].password){
            this.authenticated = true;
            this.user = this.UserData[i].userName;
            this.psswrd = this.UserData[i].password;
            this.name = this.UserData[i].name;
            this.plate = this.UserData[i].associatedPlate;
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
    return this.name;
  }

  getUserPlate(){
    return this.plate;
  }
}

export default new Auth();