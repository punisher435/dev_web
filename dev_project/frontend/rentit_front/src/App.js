import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Activate from './containers/Activate';
import Home from './containers/Home';
import Login from './containers/Login';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Signup from './containers/Signup';
import Layout from './hocs/Layout';
import { Provider } from 'react-redux';
import store from './redux/auth/store';
import PaginationCardList from './containers/PaginateCardList'
import rooms from './containers/RoomDetails'
import SimpleTabs from './containers/wishlist';
import RecentBooking from './containers/RecentBooking'
import Profile from './components/Profile';

import Checkout from './components/bookform';
// import Sforms from './components/Sforms'
import Sforms from './components/Checkout' 
import Dashboard from './components/dashboard'
import RecentBooking1 from './components/recentbookings'
import Bookingdetails from './containers/bookingdetails'
import Bookingcancel from './components/cancellation'



function App(props) {
  
  return (
    <Provider store={store}>
      <Router>
          <Layout>
            <Switch>
              <>
              <div 
              className="App">
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/reset_password' component={ResetPassword} />
                <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                <Route exact path='/activate/:uid/:token' component={Activate} />
                
                <Route exact path='/rooms' component={PaginationCardList}/>
                <Route exact path='/rooms/:roomid' component={rooms}/>
                <Route exact path='/wishlist' component={SimpleTabs}/>
                <Route exact path='/rooms/:roomid/book/' component={Checkout} />
                <Route exact path='/recentBooking' component={RecentBooking}/>
                
                <Route exact path='/Sform' component={Sforms}/>

                <Route exact path='/dashboard' component={Dashboard}/>
                <Route exact path='/dashboard/recentbookings' component={RecentBooking1}/>
                <Route exact path='/dashboard/recentbookings/:bookingid' component={Bookingdetails}/>
                <Route exact path='/dashboard/recentbookings/cancel/:bookingid' component={Bookingcancel}/>
              </div>
              </>
            </Switch>
          </Layout>
      </Router>
    </Provider>
  );
}

export default App;