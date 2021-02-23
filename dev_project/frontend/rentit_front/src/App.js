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
import Shops from './containers/shopdetails'
import Apartments from './containers/apartment_details'
import SimpleTabs from './containers/wishlist';
import RecentBooking from './containers/RecentBooking'
import Profile from './components/Profile';

import Checkout from './components/bookform';
import Checkout_shop from './components/bookform_shop'
import Checkout_apartment from './components/bookform_apartment'
// import Sforms from './components/Sforms'
import Sforms from './components/Checkout' 
import Dashboard from './components/dashboard'
import RecentBooking1 from './components/recentbookings'
import Bookingdetails from './containers/bookingdetails'
import Bookingcancel from './components/cancellation'
import Bookingextend from './components/extendbooking'
import Myprofile from './components/myprofile';
import ProfileForm from './/components/profile_form'
import BankForm from './/components/bank_form'
import AddressForm from './/components/address_profile'
import Myrooms from './components/myrooms'
import Myshops from './components/myshops'
import RoomForm from './components/room_form'
import ConfirmDelete from './components/confirmdelete'
import ConfirmPause from './components/pausebooking'
import Myapartments from './components/myapartments'
import ShopForm from './components/shop_form'
import ApartmentForm from './components/apartment_form'
import Mycoupons from './components/mycoupons'
import CouponForm from './components/coupon_form'
import ReviewForm from './components/givereviews'

import ShopListing from './containers/shoplisting'
import ApartmentListing from './containers/apartmentlisting'


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
                <Route exact path='/recentBooking' component={ConfirmPause}/>


                <Route exact path='/shops' component={ShopListing}/>
                <Route exact path='/shops/:shopid' component={Shops}/>
                <Route exact path='/shops/:shopid/book/' component={Checkout_shop} />

                <Route exact path='/apartments' component={ApartmentListing}/>
                <Route exact path='/apartments/:apartmentid' component={Apartments}/>
                <Route exact path='/apartments/:apartmentid/book/' component={Checkout_apartment} />

                <Route exact path='/dashboard/my_rooms' component={Myrooms}/>
                <Route exact path='/dashboard/my_rooms/edit' component={RoomForm}/>
                <Route exact path='/dashboard/my_rooms/delete' component={ConfirmDelete}/>
                <Route exact path='/dashboard/my_rooms/pause_booking' component={ConfirmPause}/>
                <Route exact path='/dashboard/my_shops' component={Myshops}/>
                <Route exact path='/dashboard/my_shops/edit' component={ShopForm}/>
                <Route exact path='/dashboard/my_shops/delete' component={ConfirmDelete}/>
                <Route exact path='/dashboard/my_shops/pause_booking' component={ConfirmPause}/>
                <Route exact path='/dashboard/my_apartments' component={Myapartments}/>
                <Route exact path='/dashboard/my_apartments/edit' component={ApartmentForm}/>
                <Route exact path='/dashboard/my_apartments/delete' component={ConfirmDelete}/>
                <Route exact path='/dashboard/my_apartments/pause_booking' component={ConfirmPause}/>

                <Route exact path='/dashboard/my_coupons' component={Mycoupons}/>
                <Route exact path='/dashboard/my_coupons/edit' component={CouponForm}/>
                <Route exact path='/dashboard/my_coupons/delete' component={ConfirmDelete}/>
                
                <Route exact path='/Sform' component={Sforms}/>
                <Route exact path='/dashboard/profile' component={Myprofile}/>
                <Route exact path='/dashboard/profile/edit' component={ProfileForm}/>
                <Route exact path='/dashboard/bank_details/edit' component={BankForm}/>
                <Route exact path='/dashboard/address_details/edit' component={AddressForm}/>

                <Route exact path='/dashboard' component={Dashboard}/>
                <Route exact path='/dashboard/recentbookings' component={RecentBooking1}/>
                <Route exact path='/dashboard/recentbookings/:bookingid' component={Bookingdetails}/>
                <Route exact path='/dashboard/recentbookings/cancel/:bookingid' component={Bookingcancel}/>
                <Route exact path='/dashboard/recentbookings/extend/:bookingid' component={Bookingextend}/>
                <Route exact path='/dashboard/recentbookings/:bookingid/feedback' component={ReviewForm}/>

              </div>
              </>
            </Switch>
          </Layout>
      </Router>
    </Provider>
  );
}

export default App;