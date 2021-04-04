import React,{ useState, useEffect} from 'react'
import {connect} from 'react-redux'
import Eror from '../components/eror'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import {makeStyles } from '@material-ui/core/styles';
import Tablecomp from '../components/complainttable';
import TextField from '@material-ui/core/TextField';

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;


const useStyles = makeStyles((theme) => ({
    
  
 
   
    erorclass:{
      width:'50%',
      marginLeft:'25%',
    },
    textclass:{
      border: '1px solid black',
      padding:10,
      borderRadius:'20%'
    },
    imgclass:{
      width:'90vw',
      maxWidth:'400px',
      
    },
    myclass:{
      width:'80vw',
      maxWidth:'500px',

    }

    
   
  }));


  function createData(name, calories) {
    return { name, calories};
  }
  
 

function Complaintdetails(props) {
    const classes = useStyles();

    const complaintid = props.match.params.complaint_id;

    const [complaint,setcomplaint] = useState(false)
    const [error,seterror] = useState(false)
    const [rows,setrows] = useState(false)
    const [reply,setreply] = useState('')

    React.useEffect(
        async () => {
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
              };
              
              if(props.isAuthenticated && complaintid)
              
              {
               
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcenjjbrtrtd7668ugf787t87t9yuigff/complaints/room/${complaintid}/`,config);
                
                setcomplaint(res.data)
                console.log(res.data)

                setrows([
                  createData('Issued by', res.data.customer_name),
                  createData('Issued on', res.data.room_name),
                  createData('Owner', res.data.seller_name),
                  createData('Issued date', res.data.created_at.slice(0,10)),
                  createData('Customer status', `${res.data.customer_fullfilled ? 'Closed' :'Open'}`),
                  createData('Seller status', `${res.data.seller_fullfilled ? 'Closed' :'Open'}`),
                  createData('Closed', `${res.data.seller_fullfilled && res.data.customer_fullfilled ? 'Yes' :'No'}`),
                  
                  
                ])
                
              
              }
                catch{
                    seterror(true)
                }
                
              
        }
    }
    
    ,[props.isAuthenticated,complaintid])


    if(error==true)
    {
      return <div className={classes.erorclass}><Eror error='Error' /></div>
    }


    if(complaint && rows && props.profile)
{
    return (
        <div>
          <br />
          <br />
            
           
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
          <Grid item className={classes.imgclass}>
          <img src={complaint.photo1} />
          </Grid>
          <br />

            <Grid item xs={10}>
            <Tablecomp comp={complaint.complaint_id} rows={rows}/>
            </Grid>
            
        </Grid>
        <br />

        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >

          <Typography variant='h5' color="secondary">
            {complaint.subject}
          </Typography>
          <br />

          <div className={classes.myclass}>
          <TextField
            id="message"
            label="Complaint message"
            multiline
            
            value={complaint.message}
            variant="outlined"
            onInput={(e) => {e.preventDefault();}}
            fullWidth
          />  
          </div>

          <br />

          <div className={classes.myclass}>
          <TextField
            id="reply1"
            label="Your reply"
            multiline
            fullWidth
            
            value={complaint.reply}
            variant="outlined"
            onInput={(e) => {e.preventDefault();}}
          /> 
          </div> 

          
        </Grid>

        <br />

        {
          complaint.reply==='' && props.profile.is_seller ?   <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          >
            <TextField
            id="reply"
            label="Your reply"
            multiline
            rows={4}
            value={reply}
            variant="outlined"
            onInput={(e) => {e.preventDefault();setreply(e.target.value)}}
          />  
          </Grid> : null
        }

       
        
        </div>
    )}
    else{
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authreducers.isAuthenticated,
    profile : state.authreducers.user
  });
  
  export default connect(mapStateToProps)(Complaintdetails)
