import React, { Component } from 'react';
import './App.css';

import Chores from './components/Chores';
import Landing from './components/Landing';
import Footer from './components/Footer'
import Profile from './components/Profile';

export default class ChoreBox extends Component {
  constructor(){
    super();
    this.state={
      userName: '',
      email: '',
      password: '',
      loggedIn: false
    }
  }

    userInput(userName, email, password, loggedIn) {
      this.setState({userName: userName, loggedIn: true});
      console.log(userName, email, password, typeof userName);
    }





  render() {

    const user = this.state.userName;

    let profile;
    let chores;

    if(this.state.loggedIn) {
      console.log(this.state.loggedIn)

    profile = <div className="profile">
        <Profile />
      </div>


  chores =
      <div className="chores">
         <Chores />
       </div>


      }

console.log({profile});

    return (
      <div className="App">
        <header className="App-header">
            <h1 className="App-title inline-block">ChoreTrek</h1>
            <a className="log-link inline-block">Log out</a>
            <p className="profile-name inline-block">{user}</p>
        </header>


          <div className="landing">
            <Landing userInput={this.userInput.bind(this)}/>
          </div>

          {profile}
          {chores}

          <div className="footer">
            <Footer />
          </div>
        </div>

    );
  }
}
