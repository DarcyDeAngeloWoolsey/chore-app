import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { userInput, fetchUser } from "../../actions/userInputActions";
import { logIn } from "../../actions/logInActions";
import { Redirect } from 'react-router-dom';

import Chores from "./Chores";
import Landing from "./Landing";
import Footer from "./Footer";
import Profile from "./Profile";
import UserName from "./UserName";

import "../App.css";

class ChoreBox extends Component {
  constructor(props){
    super(props);
    this.state={
        userName: ''
    };

  }

//do I even need a fetchLogin?
  componentDidMount() {
    this.props.dispatch(fetchUser());
  }

  userSubmit(userName, email, password, loggedIn) {
    this.props.dispatch(userInput(userName, email, password, loggedIn));
  }

  //need to find how we connect this to surver

  logInSubmit(userName, password, loggedIn) {
    this.props.dispatch(logIn(userName, password, loggedIn));
      this.setState({userName: userName});
      console.log("this is the logged userName " + userName);
  }



  handleClick(event) {
    event.preventDefault();
    this.setState({ userName: "", loggedIn: false });
  }

  render() {
    console.log("this is the logged userName " + this.state.userName);

    const user = this.props.users.map((data, index) => (
      <div className="profile-name inline-block" key={index}>
        <UserName userName={data.userName} />
      </div>
    ));

    this.props.users.map((data, index) => console.log(data.loggedIn));

    let logged;
    let logStatus;

    this.props.users.map((data, index) => {
      if (data.loggedIn) {
        console.log("data.loggedIn is " + data.loggedIn);
        logStatus = data.loggedIn;
      }
    });
  console.log("the log status is " + logStatus);
    if (logStatus) {
      logged = (
        <a
          className="log-link inline-block"
          onClick={this.handleClick.bind(this)}
        >
          Log out
        </a>
      );
    }

    const logOut = (
      <a
        className="log-link inline-block"
        onClick={this.handleClick.bind(this)}
      >
        Log out
      </a>
    );

    const landing = (
      <div className="landing">
        <Landing
          userInput={this.userSubmit.bind(this)}
          logIn={this.logInSubmit.bind(this)}
        />
      </div>
    );

    const dashboard = (
      <div>
        <div className="profile">
          <Profile />
        </div>
        <div className="chores">
          <Chores />
        </div>
      </div>
    );

  //  const displayOn = this.props.users[0] && this.props.users[0].loggedIn ? dashboard : landing;

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">ChoreTrek</h1>
            {logOut}
            {user}
          </header>
          <main>
            <Route path="/home" component={() => landing} />
            <Route path="/profile" render={() => dashboard} />
            <Redirect exact to={{pathname: '/home', from: '/'}} />
          </main>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  users: state.userInputReducer.users
});

export default connect(mapStateToProps)(ChoreBox);
