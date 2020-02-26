import axios from 'axios';

const orion = 'localhost:1026';

// const headers = {
//     headers : {         
//                 'fiware-servicepath' : '/',
//                 'fiware-service' : 'openiot'
//               }
// };

export default axios.create({
  baseURL: `http://${orion}/`
});