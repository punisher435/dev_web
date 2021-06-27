import axios from 'axios';
import Links from '../Appurl';


axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;






export const  fetch_apartment = async (roomid) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
      await axios.get(`${process.env.REACT_APP_API_URL}/${Links.apartment_listing}/${roomid}/`,config)
      .then(res => {
        
            const response={
                error:false,
                result:res,
    
            }
            return response;
      })
      .catch(err => {
        const response={
            error:true,
            result:[],
        }
       
        return response;
      })
      
} 