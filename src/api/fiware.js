import axios from 'axios';

const orion = '52.88.237.137:1026';

// const headers = {
//     headers : {         
//                 'fiware-servicepath' : '/',
//                 'fiware-service' : 'openiot'
//               }
// };

export default axios.create({
  baseURL: `http://${orion}/`
});