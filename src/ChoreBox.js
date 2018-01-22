import React, { Component } from 'react';
import './App.css';
import Profile from './components/Profile';
import Chores from './components/Chores';
import ChoreUpdate from './components/ChoreUpdate';

export default class ChoreBox extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ChoreTrek</h1>
        </header>
        <div className="profile">
          <Profile />
        </div>
        <div className="chores">
          <Chores />
        </div>
        <div className="chore-update">
          <ChoreUpdate />
        </div>
      </div>

    );
  }
}
