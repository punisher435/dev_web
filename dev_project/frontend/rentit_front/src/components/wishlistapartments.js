import {React,useEffect,useState} from 'react'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import axios from 'axios'
import Hidden from '@material-ui/core/Hidden';



import SearchCard from './searchcard_apartment'
import RecipeReviewCard from './card_1_apartment';
import Spinner from './Spinner';
import Eror from './eror';
import {Redirect} from 'react-router-dom';


axios.defaults.xsrfHeaderName = `${process.env.XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.CSRF_COOKIE}`;



function Wishlistapartments({isAuthenticated,access}) {

    const [posts,setpost] = useState([]);
    const [error,seterror] = useState('');
    const [loading,setloading] = useState(false);
    const [open1,setOpen1] = useState(false);
    const [open2,setOpen2] = useState(false);
    const [wishlistitems,changeitemswishlist] = useState(0)
    const [cartitems,changeitemscart] = useState(0)

    const myStlye = {
        border: '0px'
      };

    useEffect(async () => {
        if(isAuthenticated)
        setloading(true);
        {
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access}`,
                },
              };
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcenasdknahi29ad/wishlist/apartments/`,config,config);
                setpost(res.data);
            }
            catch{
                seterror('Oops! an error occurred');
            }
        setloading(false);
        }
    },[])

    if(loading)
    {

        return (
            <Grid
         container
          direction="row"
         justify="center"
           alignItems="center"
        >
        <Spinner loading={loading}/>
        </Grid>
        );
    } 

    if(error!=='')
    {

        return (
            <Grid
         container
          direction="row"
         justify="center"
           alignItems="center"
        >
        <Eror error={error} />
        </Grid>
        );
    } 
    if(isAuthenticated===false)
    {
        return <Redirect to='/login'/>
    }

    return (
        <div>

        <Grid
         container
          direction="row"
         justify="center"
           alignItems="center"
        >

        <Grid item xs={1}/>

        <Grid item xs={10}>

        <ul className='list-group mb-4'>
            {posts.map(post => (
            <li key={post.apartment_id} style={myStlye} className='list-group-item'>
            {/* {post.title} */}
            <Hidden smDown>
        <Grid item md={12}>
          <SearchCard post={post} loading={loading} setOpen1={setOpen1} setOpen2={setOpen2} wishlistitems={wishlistitems} cartitems={cartitems} changeitemswishlist={changeitemswishlist} changeitemscart={changeitemscart}/>
          </Grid>
          </Hidden>
        <Hidden mdUp>
        <Grid item md={12}>
        <RecipeReviewCard post={post} setOpen1={setOpen1} setOpen2={setOpen2}  wishlistitems={wishlistitems} changeitemswishlist={changeitemswishlist}/>
        </Grid>
        </Hidden>
            </li>
            ))}
        </ul>

        </Grid>

        <Grid item xs={1}/>

       

        </Grid>
        
            
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.authreducers.isAuthenticated,
    access: state.authreducers.access
  });
  
  export default connect(mapStateToProps)(Wishlistapartments);
  
