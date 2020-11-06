import axios from 'axios'

export const HTTP = axios.create({
  baseURL: `https://myapp-ci.azurewebsites.net`,
  headers: {
    'Access-Control-Allow-Origin': 'https://myappci-front.azurewebsites.net/',
    'Access-Control-Request-Method': 'GET, POST',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, auth-token'
  }
})
