import React, { Component } from 'react';
import {connect} from 'react-redux';

import '../Landing.css';

class Landing extends Component {

  constructor(){
    super();
    this.state={
      showCreateProfile: false,
      showLogIn: false,
    };
  }

//buttons will need to link to profile
handleClick(event) {
  if(event.target.id === "createProfileButton") {
    this.setState({
      showCreateProfile: !this.state.showCreateProfile,
      showLogIn: false,
    });
  }
  else if(event.target.id === "logInButton") {
    this.setState({
      showLogIn: !this.state.showLogIn,
      showCreateProfile: false,
    });
  }
}

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

 this.setState({
   showCreateProfile: false,
   showLogIn: false
 });

}

handleLogInSubmit(event){
  event.preventDefault();
  let email;
  let password;


  email = event.target.email.value;
  password = event.target.password.value;


console.log(email, password);

 this.props.logIn(email.trim(), password.trim());


 this.setState({
   showCreateProfile: false,
   showLogIn: false
 });

}



    render() {

      let createProfile;
      let logIn;
      if(this.state.showCreateProfile) {
        createProfile = <form id="createForm" onSubmit={this.handleCreateUserSubmit.bind(this)}>
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
      }
      else if(this.state.showLogIn) {
        logIn = <form id="logInForm" onSubmit={this.handleLogInSubmit.bind(this)}>
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
      }


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
                     <button id="createProfileButton" onClick={this.handleClick.bind(this)}>Create a Profile</button>
                 </div>
                 <div className="log inline-block">
                     <button id="logInButton" onClick={this.handleClick.bind(this)}>Log In</button>
                 </div>
              </div>

               {createProfile}
               {logIn}
          </div>
          );
      }
}

export default connect()(Landing);
