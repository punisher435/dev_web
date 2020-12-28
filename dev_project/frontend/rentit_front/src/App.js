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
import Pagination from './containers/PaginateCardList'
import rooms from './containers/RoomDetails'


function App(props) {
  const mystyle ={
    margin: '50px 0 0 0',
  };
  return (
    <Provider store={store}>
      <Router>
          <Layout>
            <Switch>
              <>
              <div style={mystyle}
              className="App">
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/reset_password' component={ResetPassword} />
                <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                <Route exact path='/activate/:uid/:token' component={Activate} />
                <Route exact path='/searchList' component={Pagination}/>
                <Route exact path='/rooms' component={rooms}/>
              </div>
              </>
            </Switch>
          </Layout>
      </Router>
    </Provider>
  );
}

export default App;