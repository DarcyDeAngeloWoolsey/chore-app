import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import '../Landing.css';

class Landing extends Component {



handleCreateUserSubmit(event){
  event.preventDefault();
  let userName;
  let email;
  let password;
  userName = event.target.userName.value;
  email = event.target.email.value;
  password = event.target.password.value;
  console.log(userName, email, password);
  this.props.userInput(userName.trim(), email.trim(), password.trim());

}

handleLogInSubmit(event){
  event.preventDefault();
  let email;
  let password;
  email = event.target.email.value;
  password = event.target.password.value;
  console.log(email, password);
  this.props.logIn(email.trim(), password.trim());

}

    render() {
      const createProfile =
      <div>
      <form id="createForm" onSubmit={this.handleCreateUserSubmit.bind(this)}>
          <div className="col-12-xs inline-block">
            <label htmlFor="userName">User Name</label>
            <br/>
            <input type="text" name="userName" placeholder="$Mr.MoneyBags$"  ref={input => (this.userName = input)} required/>
          </div>
          <div className="col-12-xs inline-block">
            <label htmlFor="email">Email</label>
            <br/>
            <input type="email" name="email" placeholder="moneybags@email.com" ref={input => (this.email= input)} required/>
          </div>
          <div className="col-12-xs inline-block">
            <label htmlFor="password">Password</label>
            <br/>
            <input type="password" name="password" placeholder="password" ref={input => (this.password = input)} required/>
          </div>
          <div className="col-12-xs inline-block">
            <input type="submit" value="Create Profile" />
          </div>
        </form>
        </div>

      const logIn =
      <div>
      <form id="logInForm" onSubmit={this.handleLogInSubmit.bind(this)}>
            <div className="col-12-xs inline-block">
              <label htmlFor="email">Email</label>
              <br/>
              <input type="email" name="email" placeholder="moneybags@email.com" ref={input => (this.email = input)} required/>
            </div>
            <div className="col-12-xs inline-block">
              <label htmlFor="password">Password</label>
              <br/>
              <input type="password" name="password" placeholder="password" ref={input => (this.password = input)} required/>
            </div>
            <div className="col-12-xs inline-block">
              <input type="submit" value="Log In" />
            </div>
          </form>
          </div>


        return (
          <div>
              <div className="box row section-border clear">
                 <div className="intro-div col-12-xs">
                   <p className="intro">Earn, Save, Spend</p>
                   <p className="intro">Fun virtual bank account for young family members to track savings and spending and learn along the way.</p>
                 </div>
              </div>
             <div className="box row clear">
                 <div className="create inline-block">
                    <button><Link to="/sign-up">Create Profile</Link></button>
                 </div>
                 <div className="log inline-block">
                  <button><Link to="/login">Log In</Link></button>
                 </div>
              </div>
                <div>
                  <Route path="/sign-up" render={() => (createProfile)} />
                  <Route path="/login" component={() => (logIn) } />
                </div>
          </div>

          );
      }
}

export default connect()(Landing);
