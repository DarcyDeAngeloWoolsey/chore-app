import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { withRouter } from "react-router";

import "../Landing.css";

class Landing extends Component {
  handleCreateUserSubmit(event) {
    event.preventDefault();
    let userName;
    let email;
    let password;
    userName = event.target.userName.value;
    email = event.target.email.value;
    password = event.target.password.value;
    console.log(userName, email, password);
    this.props.userInput(userName.trim(), email.trim(), password.trim());
    this.props.history.push("/profile");
    console.log(this.props.history);
  }

  handleLogInSubmit(event) {
    event.preventDefault();
    let userName;
    let password;
    userName = event.target.userName.value;
    password = event.target.password.value;
    console.log(userName, password);
    this.props.logIn(userName.trim(), password.trim());
  }



  render() {
    const enter = (
      <div className="enter">
        <Link to="/home/login">Enter</Link>
      </div>
    );

    const createProfile = (
      <div>
        <form id="createForm" onSubmit={this.handleCreateUserSubmit.bind(this)}>
          <div className="col-12-xs inline-block">
            <label htmlFor="userName">User Name</label>
            <br />
            <input
              type="text"
              name="userName"
              placeholder="$Mr.MoneyBags$"
              ref={input => (this.userName = input)}
              required
            />
          </div>
          <div className="col-12-xs inline-block">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="moneybags@email.com"
              ref={input => (this.email = input)}
              required
            />
          </div>
          <div className="col-12-xs inline-block">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="password"
              ref={input => (this.password = input)}
              required
            />
          </div>
          <div className="col-12-xs inline-block">
            <button type="submit">Create profile</button>
            {/*<input type="submit" value="Creat Profile" />*/}
          </div>
          <div className="log inline-block">
            <p className="inline-block">Have an account?</p>
            <Link to="/home/login">Log In</Link>
          </div>
        </form>
      </div>
    );

    const logIn = (
      <div>
        <form id="logInForm" onSubmit={this.handleLogInSubmit.bind(this)}>
          <div className="col-12-xs inline-block">
            <label htmlFor="userName">User Name</label>
            <br />
            <input
              type="text"
              name="userName"
              placeholder="$Mr.MoneyBags$"
              ref={input => (this.userName = input)}
              required
            />
          </div>
          <div className="col-12-xs inline-block">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="password"
              ref={input => (this.password = input)}
              required
            />
          </div>
          <div className="col-12-xs inline-block">
            <input type="submit" value="Log In" />
          </div>
          <div className="log inline-block">
            <p className="inline-block">{ 'Don\'t have an account?' }</p>
            <Link to="/home/sign-up">Create Profile</Link>
          </div>
        </form>
      </div>
    );

    return (
      <div>
        <div className="box row section-border clear">
          <div className="intro-div col-12-xs">
            <p className="intro">Earn, Save, Spend, Get Rewarded</p>
            <p className="intro">Virtual Banking for the Family</p>
          </div>
        </div>
        <div>
          <Switch>
            <Route exact path="/home" render={() => enter} />
            <Route path="/home/sign-up" render={() => createProfile} />
            <Route path="/home/login" render={() => logIn} />
          </Switch>
        </div>
        <div className="box row">
          <div className="howto-div col-12-xs">
            <p className="howto section-border">
              Track money you earn by "depositing" it
            </p>
            <p className="howto section-border">
              Level up and earn badges for saving more
            </p>
            <p className="howto section-border">
              "Withdraw" money you have to spend on things you want
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(Landing));
