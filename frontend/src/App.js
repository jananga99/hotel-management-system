import React from 'react';
import { observer } from 'mobx-react';
import UserStore    from  './components/stores/UserStore';
import LoginForm from './components/LoginForm';
import SubmitButton from './components/SubmitButton';
import './App.css';

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
          'Content-Type' : 'application/json',
        },
      });

      let result = await res.json();

      if(result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.first_name = result.first_name;
        UserStore.email = result.email;
      }else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch(error) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async doLogout() {
    try {
      let res = await fetch('/logout',{
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type':'application/json',
        },
      });

      let result = await res.json();

      if(result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.loading = false;
        UserStore.email = '';
        UserStore.first_name = '';
      }
    }catch (error) {
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
      if(UserStore.isLoggedIn) {
        return(
          <div className='app'>
            <div className='container'>
              Welcome {UserStore.first_name}
              <SubmitButton 
                text = 'Logout'
                onClick={()=>this.doLogout()}
              />
            </div>
          </div>
        );
      }
    }
    return(
      <div className="app">
        <div className='container'>
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default observer(App);
