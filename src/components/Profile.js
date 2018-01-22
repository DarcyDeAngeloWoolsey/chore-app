import React, { Component } from 'react';
import level1 from '../level1-icon.png';
import './Profile.css';

class Profile extends Component {
  render() {
    return (
      <div className="box row w900">
        <header className="profile-header">
          <div className="profile-avatar-div col-4-sm col-12-xs">
            <img src={level1} className="profile-avatar" alt="avatar" />
          </div>
          <div className="profile-level-div col-6-sm col-12-xs">
            <h2 className="profile-level-title">Level 1</h2>
          </div>
        </header>
      </div>

    );
  }
}

export default Profile;
