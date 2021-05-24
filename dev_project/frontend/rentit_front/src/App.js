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
import Bookingdetails_shop from './containers/bookingdetails_shop'
import Bookingdetails_apartment from './containers/bookingdetails_apartment'
import Bookingcancel from './components/cancellation'
import Bookingcancel_shop from './components/cancelbooking_shop'
import Bookingcancel_apartment from './components/cancelbooking_apartment'
import Bookingextend from './components/extendbooking'
import Bookingextend_shop from './components/extendbooking_shop'
import Bookingextend_apartment from './components/extendbooking_apartment'
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
import MyReviews from './components/seller_reviews'
import Analytics from './components/analytics'
import Admin from './containers/admin'

import Complaintroom from './components/mycomplaints'
import Complaintroomdetails from './containers/complaintdetails'
import Complaintform from './containers/complaint_form'

import Complaintshop from './components/mycomplaints_shop'
import Complaintshopdetails from './containers/complaintdetails_shop'
import Complaintformshop from './containers/complaint_form_shop'

import Complainthousing from './components/mycomplaints_apartment'
import Complainthousingdetails from './containers/complaintdetails_apartment'
import Complaintformhousing from './containers/complaint_form_apartment'
import Terms from './containers/terms';
import About from './containers/Aboutus';


require('dotenv').config()


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

                <Route exact path='/policies' component={Terms}/>


                <Route exact path='/shops' component={ShopListing}/>
                <Route exact path='/shops/:shopid' component={Shops}/>
                <Route exact path='/shops/:shopid/book/' component={Checkout_shop} />

                <Route exact path='/housing' component={ApartmentListing}/>
                <Route exact path='/housing/:apartmentid' component={Apartments}/>
                <Route exact path='/housing/:apartmentid/book/' component={Checkout_apartment} />

                <Route exact path='/dashboard/analytics' component={Analytics}/>

                <Route exact path='/dashboard/my_rooms' component={Myrooms}/>
                <Route exact path='/dashboard/my_rooms/edit' component={RoomForm}/>
                <Route exact path='/dashboard/my_rooms/delete' component={ConfirmDelete}/>
                <Route exact path='/dashboard/my_rooms/pause_booking' component={ConfirmPause}/>
                <Route exact path='/dashboard/my_shops' component={Myshops}/>
                <Route exact path='/dashboard/my_shops/edit' component={ShopForm}/>
                <Route exact path='/dashboard/my_shops/delete' component={ConfirmDelete}/>
                <Route exact path='/dashboard/my_shops/pause_booking' component={ConfirmPause}/>
                <Route exact path='/dashboard/my_housing' component={Myapartments}/>
                <Route exact path='/dashboard/my_housing/edit' component={ApartmentForm}/>
                <Route exact path='/dashboard/my_housing/delete' component={ConfirmDelete}/>
                <Route exact path='/dashboard/my_housing/pause_booking' component={ConfirmPause}/>

                <Route exact path='/dashboard/my_reviews' component={MyReviews}/>

                <Route exact path='/dashboard/my_coupons' component={Mycoupons}/>
                <Route exact path='/dashboard/my_coupons/edit' component={CouponForm}/>
                <Route exact path='/dashboard/my_coupons/delete' component={ConfirmDelete}/>
                
                <Route exact path='/Sform' component={Sforms}/>
                <Route exact path='/dashboard/profile' component={Myprofile}/>
                <Route exact path='/dashboard/profile/edit' component={ProfileForm}/>
                <Route exact path='/dashboard/bank_details/edit' component={BankForm}/>
                <Route exact path='/dashboard/address_details/edit' component={AddressForm}/>

            
                <Route exact path='/dashboard/recentbookings' component={RecentBooking1}/>
                <Route exact path='/dashboard/recentbookings/room-bookings/:bookingid' component={Bookingdetails}/>
                <Route exact path='/dashboard/recentbookings/shop-bookings/:bookingid' component={Bookingdetails_shop}/>
                <Route exact path='/dashboard/recentbookings/housing-bookings/:bookingid' component={Bookingdetails_apartment}/>

                <Route exact path='/dashboard/recentbookings/room-bookings/cancel/:bookingid' component={Bookingcancel}/>
                <Route exact path='/dashboard/recentbookings/room-bookings/extend/:bookingid' component={Bookingextend}/>

                <Route exact path='/dashboard/recentbookings/shop-bookings/cancel/:bookingid' component={Bookingcancel_shop}/>
                <Route exact path='/dashboard/recentbookings/shop-bookings/extend/:bookingid' component={Bookingextend_shop}/>

                <Route exact path='/dashboard/recentbookings/housing-bookings/cancel/:bookingid' component={Bookingcancel_apartment}/>
                <Route exact path='/dashboard/recentbookings/housing-bookings/extend/:bookingid' component={Bookingextend_apartment}/>

                <Route exact path='/dashboard/recentbookings/room-bookings/:bookingid/feedback' component={ReviewForm}/>
                <Route exact path='/dashboard/recentbookings/shop-bookings/:bookingid/feedback' component={ReviewForm}/>
                <Route exact path='/dashboard/recentbookings/housing-bookings/:bookingid/feedback' component={ReviewForm}/>

                <Route exact path='/admin/jdwai2021801yadb28ykha2sad1893812/awuhd812832232w7dyqw1/ada' component={Admin}/>


                <Route exact path='/dashboard/complaints/room' component={Complaintroom}/>
                <Route exact path='/complaints/room/:complaint_id' component={Complaintroomdetails}/>
                <Route exact path='/dashboard/complaints/room/create' component={Complaintform}/>

                <Route exact path='/dashboard/complaints/shop' component={Complaintshop}/>
                <Route exact path='/complaints/shop/:complaint_id' component={Complaintshopdetails}/>
                <Route exact path='/dashboard/complaints/shop/create' component={Complaintformshop}/>

                <Route exact path='/dashboard/complaints/housing' component={Complainthousing}/>
                <Route exact path='/complaints/housing/:complaint_id' component={Complainthousingdetails}/>
                <Route exact path='/dashboard/complaints/housing/create' component={Complaintformhousing}/>
                <Route exact path='/about-us' component={About} />

              </div>
              </>
            </Switch>
          </Layout>
      </Router>
    </Provider>
  );
}

export default App;