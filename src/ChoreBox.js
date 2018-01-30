import React, { Component } from 'react';
import './App.css';
import Profile from './components/Profile';
import Chores from './components/Chores';
import Footer from './components/Footer'

export default class ChoreBox extends Component {

  render() {

    return (
      <div className="App">
        
        <div className="profile">
          <Profile />
        </div>
        <div className="chores">
          <Chores />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>

    );
  }
}
