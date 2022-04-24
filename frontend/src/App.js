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

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.first_name = result.first_name;
        UserStore.email = result.email;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (error) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
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

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.loading = false;
        UserStore.email = '';
        UserStore.first_name = '';
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
        return (
          <div className='app'>
            <div className='container'>
              <Home UserStore={UserStore} doLogout={this.doLogout} />
              <Router>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/admin/all-customers" element={<AllModerators />} />
                  <Route path="/admin/create-customers" element={<CreateModerator />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </div>
          </div>
        );
      } else {
        return (
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
