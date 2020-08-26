import axios from 'axios';

const orion = '34.212.172.133:1026';

// const headers = {
//     headers : {         
//                 'fiware-servicepath' : '/',
//                 'fiware-service' : 'openiot'
//               }
// };

export default axios.create({
  baseURL: `http://${orion}/`
});