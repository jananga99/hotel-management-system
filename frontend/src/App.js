import React from 'react';
import { observer } from 'mobx-react';
import UserStore from './components/stores/UserStore';
import LoginForm from './components/LoginForm';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminDashboard from "./components/admin/AdminDashboard";
import NotFound from "./components/NotFound";
import Home from './components/Home';
import AllModerators from './components/admin/AllModerators';
import AllCustomers from './components/admin/AllCustomers';
import CreateModerator from './components/admin/CreateModerator';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      let res = await fetch('/isLoggedIn', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      let result = await res.json();

      if(result && result.success) {
        UserStore.modifyObservable(false, true, result.first_name, result.email, result.type);
      }else {
        UserStore.modifyObservable(false, false)
      }
    } catch(error) {
      UserStore.modifyObservable(false, false)
    }
  }

  async doLogout() {
    try {
      let res = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      let result = await res.json();

      if(result && result.success) {
        UserStore.modifyObservable(false, false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className='app'>
          <div className='container'>
            LOADING...
          </div>
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        if(UserStore.type === 0) {
          return(
          <div className='app row'>
            <div className='container col-md-8'>
              <Home UserStore={UserStore} url={window.location.href} doLogout={this.doLogout} />
              <Router>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/admin/all-customers" element={<AllModerators />} />
                  <Route path="/admin/create-customers" element={<CreateModerator />} />
                  <Route path='/admin/customers' element={<AllCustomers />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </div>
          </div>
          );
        }else if(UserStore.type ===  1){
          return(
            <div>Insert Moderator Component Here</div>
          );
        }else{
          return(
            <div>Insert Customer Component Here</div>
          );
        }

      }else {
        return(
          <div className="app">
            <div className='container'>
              <LoginForm />
            </div>
          </div>
        );
    }
    }
  }
}

export default observer(App);
