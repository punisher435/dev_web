import {React,useState} from 'react';
import SearchCard from './SearchCard'
import Spinner from './Spinner'
import RecipeReviewCard from './card_1';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import SimpleSnackbar from './wishlistsmackbar';
import SimpleSnackbar1 from './cartsmackbar';

const Posts = ({ posts, loading,changeitemswishlist,changeitemscart,wishlistitems,cartitems }) => {

  const [open1,setOpen1] = useState(false);
  const [open2,setOpen2] = useState(false);
  const myStlye = {
    border: '0px'
  };

  return (
    <ul className='list-group mb-4'>

       <Spinner loading={loading} />
       <SimpleSnackbar open={open1} setOpen={setOpen1}/>
       <SimpleSnackbar1 open={open2} setOpen={setOpen2}/>
      {posts.map(post => (
        <li key={post.room_id} style={myStlye} className='list-group-item'>
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
  );
};

export default Posts;