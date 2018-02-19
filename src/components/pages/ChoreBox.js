import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { registerUser} from "../../actions/userInputActions";

//when we set up userInput reducer to get currentUser we can use this
//import { userInput, fetchUser } from "../../actions/userInputActions";
import { login} from "../../actions/logInActions";

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
      auth: [
        {
          username: '',
          password: ''
        }
      ]
    }
}

//when we set up userInput reducer to get currentUser we can use this
  // componentDidMount() {
  //   this.props.dispatch(fetchUser());
  // }

  userSubmit(username, email, password) {
    this.props.dispatch(registerUser(username, email, password));
    console.log(username, email, password);
  }

  //need to find how we connect this to surver
  //i believe I EITHER dispatch or setState. But if I setState do I even need to make a post request?
  logInSubmit(username, password, loggedIn) {
    this.props.dispatch(login(username, password, loggedIn));
      this.setState({username: username});
      console.log("this is the logged username " + username);
  }


  handleClick(event) {
    event.preventDefault();
    this.setState({ username: "", loggedIn: false });
  }

  render() {
    let currentUser = this.state.username;
    console.log(currentUser);

//when we set up userInput reducer to get currentUser we can use this
    // const users = this.props.users.map((data, index) => (
    //     {...data}
    // ));
    // console.log(users);
    //
    // const user = this.props.users.map((data, index) => (
    //   <div className="profile-name inline-block" key={index}>
    //     <UserName username={data.username} />
    //   </div>
    // ));

    // this.props.users.map((data, index) => console.log(data.loggedIn));

  //   let logged;
  //   let logStatus;
  //
  //   this.props.users.map((data, index) => {
  //     if (data.loggedIn) {
  //       console.log("data.loggedIn is " + data.loggedIn);
  //       logStatus = data.loggedIn;
  //     }
  //   });
  // console.log("the log status is " + logStatus);
  //   if (logStatus) {
  //     logged = (
  //       <a
  //         className="log-link inline-block"
  //         onClick={this.handleClick.bind(this)}
  //       >
  //         Log out
  //       </a>
  //     );
  //   }

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
          registerUser={this.userSubmit.bind(this)}
          login={this.logInSubmit.bind(this)}
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
            {/*//when we set up userInput reducer to get currentUser we can use this
            // {user}*/}
          </header>
          <main>
          <Switch>
            <Route path="/home" component={() => landing} />
            <Route path="/profile" render={() => dashboard} />
            <Redirect exact to={{pathname: '/home', from: '/'}} />
            </Switch>
          </main>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

//when we set up the userInput Reducer to show the current user, we can use this
// const mapStateToProps = state => ({
//   users: state.userInputReducer.users
// });

// export default connect(mapStateToProps)(ChoreBox);

 export default connect()(ChoreBox);
