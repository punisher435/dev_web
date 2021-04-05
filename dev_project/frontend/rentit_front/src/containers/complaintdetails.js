import React,{ useState, useEffect} from 'react'
import {connect} from 'react-redux'
import Eror from '../components/eror'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import {makeStyles } from '@material-ui/core/styles';
import Tablecomp from '../components/complainttable';
import TextField from '@material-ui/core/TextField';
import SimpleModal from '../components/imagemodal';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../components/css/App.css';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';


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
    imgclass1:{
      width:'35vw',
      maxWidth:'200px',
     
      
    },
    imgclass2:{
      width:'35vw',
      maxWidth:'200px',
     
      
    },
    myclass:{
      width:'80vw',
      maxWidth:'500px',

    },
    buttonclass:{
      padding:0,
      width:'90vw',
      maxWidth:'400px',
      
    },
    buttonclass1:{
      padding:0,
      width:'35vw',
      maxWidth:'200px',

      
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    divclass: {
      width:'90vw',
      height:'50vh',
      maxHeight:'900px',
      maxWidth:'700px',
      backgroundColor:'white',
      overflowY: 'scroll',
    },
    message:{
      padding:10,
      backgroundColor:'#dbf6e9',
     
    
    },

    message1:{
      padding:10,
      backgroundColor:'#9ddfd3',
      
      
    },

    
   
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
    const [photo,setphoto] = useState('')
    const [open,changeopen] = useState(false)
    const [load,setload] = useState(false)
    const [message,setmessage] = useState(false)
    const [done,setdone] = useState(false)
    const hiddenFileInput1 = React.useRef(null);

    const [open1,changeopen1] = useState(false)
    const [showphoto,setshowphoto] = useState('')

    React.useEffect(
        async () => {
          const config = {
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
            },
            params:{
              type:'room'
            },
          };
              
              if(props.isAuthenticated && complaintid)
              
              {
               
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcenjjbrtrtd7668ugf787t87t9yuigff/complaints/room/${complaintid}/`,config);
                
                setcomplaint(res.data)
                
               

                setrows([
                  createData('Issued by', res.data.customer_name),
                  createData('Issued on', res.data.room_name),
                  createData('Owner', res.data.seller_name),
                  createData('Issued date', res.data.created_at.slice(0,10)),
                  createData('Customer status', `${res.data.customer_fullfilled ? 'Closed' :'Open'}`),
                  createData('Seller status', `${res.data.seller_fullfilled ? 'Closed' :'Open'}`),
                  createData('Closed', `${res.data.seller_fullfilled && res.data.customer_fullfilled ? 'Yes' :'No'}`),
                  createData('Owner contact', res.data.seller_contact),
                  createData('Issuer contact', res.data.customer_contact),
                  
                ])

                


                try{

                  
                  
                  const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceadhwu178y2819gysag9812yg73467vbs3y28yga/complaints/messages/${complaintid}/`,config);
                
                setmessage(res.data)
                console.log(res.data)
                setdone(true)
               

              

               
                
              
              }
              catch{
                
              }
                
              
              }
                catch{
                    seterror(true)
                }
                
              
        }
    }


   
    
    ,[props.isAuthenticated,complaintid])


    const Filevalidation1 = (file1,name) => {
  
 
      // Check if any file is selected.
      
         
    
              const fsize =file1.size;
              const file = Math.round((fsize / 1024));
              // The size of the file.
              if (file >= 5120) {
                  alert(
                    "File too Big, please select a file less than 5mb");
              } 
              else{
                
              
                setphoto(file1);
                document.getElementById("attached_file").innerHTML = file1.name;
              }
          
      
    }


    const handleclick1 = async (e) => {
      e.preventDefault();
      const config = {
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
      };

      const body = {
        data:reply,
      }
      
      if(reply!=='' || photo!=='')

      document.getElementById("attached_file").innerHTML = "";
     
      
      {
        setload(true);

        let form_data = new FormData();
      
        form_data.append('message',reply)
        
        form_data.append('photo',photo)
       
        try{const res = await axios.put(`${process.env.REACT_APP_API_URL}/sourcenjjbrtrtd7668ugf787t87t9yuigff/complaints/room/${complaintid}/`,form_data,config);
        
        setmessage(res.data)
               

                
                

                setload(false)
                setreply('')
                setphoto('')
        
      
      }
        catch{

          setload(false)

          seterror(true)
            
        }
    }

  }



  const handleclick2 = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`,
      },
    };
    const body = {
      data:'',
    }

    
    
    if(props.profile.is_seller)
    
    {

      setload(true)
     
      try{const res = await axios.patch(`${process.env.REACT_APP_API_URL}/sourcenjjbrtrtd7668ugf787t87t9yuigff/complaints/room/${complaintid}/`,body,config);
      
      setcomplaint(res.data)
               

                setrows([
                  createData('Issued by', res.data.customer_name),
                  createData('Issued on', res.data.room_name),
                  createData('Owner', res.data.seller_name),
                  createData('Issued date', res.data.created_at.slice(0,10)),
                  createData('Customer status', `${res.data.customer_fullfilled ? 'Closed' :'Open'}`),
                  createData('Seller status', `${res.data.seller_fullfilled ? 'Closed' :'Open'}`),
                  createData('Closed', `${res.data.seller_fullfilled && res.data.customer_fullfilled ? 'Yes' :'No'}`),
                  createData('Owner contact', res.data.seller_contact),
                  createData('Issuer contact', res.data.customer_contact),
                  
                ])
      
                setload(false)
    }
      catch{

        setload(false)

        seterror(true)
         
      }
  }

}


    if(error==true)
    {
      return <div className={classes.erorclass}><Eror error='Error' /></div>
    }


    if(complaint && rows && props.profile && done)
{
    return (
        <div>

<Backdrop className={classes.backdrop} open={load}>
        <CircularProgress color="inherit" />
      </Backdrop>


          <SimpleModal open={open} change={changeopen} photo={complaint.photo1}/>

          <SimpleModal open={open1} change={changeopen1} photo={showphoto}/>
          <br />
          <br />
            
           
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
          <Grid item className={classes.imgclass}>
          <Button onClick={(e) => {e.preventDefault();changeopen(true)}} className={classes.buttonclass}><img src={complaint.photo1} /></Button>
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

         

          

          
        </Grid>

        <br />

        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          
          >

            

            <div className={classes.divclass}>
            <br />
             
              {
                message.map((mes) => (
                  
                  
                  
                    mes.sender_id!==props.profile.id ?  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                  ><Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                ><div className="triangle-left" /><div className={classes.message}><div className={classes.imgclass1}><Button onClick={(e) => {e.preventDefault();setshowphoto(mes.photo);changeopen1(true);}} className={classes.buttonclass1}><img src={mes.photo} /></Button></div>
                    <p>{mes.message}</p></div></Grid><br /></Grid> : 
                    <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-end"
                  ><Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                ><div className={classes.message1}><div className={classes.imgclass2}><Button onClick={(e) => {e.preventDefault();setshowphoto(mes.photo);changeopen1(true);}} className={classes.buttonclass1}><img src={mes.photo} /></Button></div>
                    <p>{mes.message}</p></div><div className="triangle-right" /></Grid><br /></Grid>
                  

                  
                 
                ))
              }
            </div>
          </Grid>


        <br />

       


        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          
          >
<input type='file' ref={hiddenFileInput1} style={{display:'none'}} id='photo' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {
          event.preventDefault();Filevalidation1(event.target.files[0]);}}/> 

          <br />
             
          
          <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
>
      <FormControl variant="outlined" noValidate className={classes.myclass}>
                            <InputLabel >Message</InputLabel>
                            <OutlinedInput
                                value={reply}
                                onInput={(e) => {e.preventDefault();setreply(e.target.value)}}
            
                                endAdornment={
                                    <InputAdornment position="end">
                                    <IconButton onClick={(e) =>{handleclick1(e);}}>
                                       <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                                }
                                labelWidth={100}
                                />
                            </FormControl>
          

          
          <IconButton onClick={(e) => {hiddenFileInput1.current.click();}}><AttachFileIcon /></IconButton>
          <p id="attached_file"></p>
          </Grid>
          </Grid>

       


<br />
<br />
<Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          
          >

{
  props.profile.is_seller && complaint.seller_fullfilled===false ? <Button variant="contained" color="secondary" onClick={(e) =>{handleclick2(e);}}>
  Close complaint
</Button> : null
}

{
  props.profile.is_seller===false && complaint.customer_fullfilled===false ? <Button variant="contained" color="secondary" onClick={(e) =>{handleclick2(e);}}>
  Close complaint
</Button> : null
}
    
    
    

          </Grid>
  <br />
     

       
        
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
