import React, { Component } from 'react';
import {connect} from 'react-redux';
import {userInput} from '.../actions/userInputActions';

import Chores from './Chores';
import Landing from './Landing';
import Footer from './Footer';
import Profile from './Profile';
import UserName from './UserName';

import '../App.css';



class ChoreBox extends Component {

//?? how do we fetch users from the server to check agains? we we do it during componentDidMount?
//??is it ok for me to have 2 ?methods? in one component, like in Layout?

  userInput(userName, email, password, loggedIn) {
    this.props.dispatch(userInput(userName, email, password, loggedIn));
  }

  //need to find how we connect this to surver

  logIn(email, password, loggedIn) {
    this.props.dispatch(userInput(email, password, loggedIn));
  }

  handleClick(event) {
      event.preventDefault();
      this.setState({userName: '', loggedIn: false});
    }



  render() {
    const user = this.props.users.map((data, index) =>
      <div className="profile-name inline-block" key={index}>
      <UserName userName = {data.userName} />
      </div>
    );

    this.props.users.map((data, index) =>
      console.log(data.loggedIn)
    );

    let dashboard;
    let landing;

    landing =  <div className="landing">
               <Landing userInput={this.userInput.bind(this)} logIn={this.logIn.bind(this)}/>
               </div>

    dashboard = <div>
                <div className="profile">
                <Profile />
                </div>
                <div className="chores">
                <Chores />
                </div>
                </div>

    const displayOn = this.props.users[0]&&this.props.users[0].loggedIn?dashboard:landing;


    return (
      <div className="App">
        <header className="App-header">
            <h1 className="App-title inline-block">ChoreTrek</h1>
            <a className="log-link inline-block" onClick={this.handleClick.bind(this)} >Log out</a>
            {user}
        </header>
          {displayOn}
          <div className="footer">
            <Footer />
          </div>
        </div>
    );
  }
}


const mapStateToProps = state => ({
    users: state.userInputReducer.users
});


export default connect(mapStateToProps)(ChoreBox);
