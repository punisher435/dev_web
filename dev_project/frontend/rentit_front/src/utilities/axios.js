import { create } from 'apisauce'

// define the api
const api = create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
   
    'Accept': 'application/json'
},
})

// start making calls
export default api;