import React, { Component } from 'react';
import level1 from '../level1-icon.png';
import angel from '../Angel-icon.png';
import clown from '../Clown-icon.png';
import mermaid from '../Mermaid-icon.png';
import dragon from '../Dragon-icon.png';
import './Profile.css';
import {connect} from 'react-redux';

class Profile extends Component {
  constructor(){
    super();
    this.state={
      showAvatarGallery: false,
      imageChoice: level1
    };
  }

  handleClick(event) {
    console.log("Icon has been clicked");
    let newImageChoice = event.target.src;
    console.log(newImageChoice)
    this.setState({
      showAvatarGallery: !this.state.showAvatarGallery,
      imageChoice: newImageChoice
    });
  }

  render() {

    let count = 0;
    let level = 1;

    this.props.choreList.map((chores, index) => {
      if(chores.choreBanking === "Deposit"){
        count++;
          if(count % 5 === 0){
            level = parseInt((count / 5) + 1);
            console.log(count);
          }
      }
        else if (chores.choreBanking === "Withdrawl") {
          count--;
            if(count % 5 === 4){
              level = parseInt((count / 5) + 1);
              console.log(count);
            }
          }
          return count;
      });

      let galleryNode;

      if(this.state.showAvatarGallery) {
        galleryNode = <div className="profile-level-div col-12-xs">

          <img src={level1} id="avatar1" className="profile-avatar" alt="avatar" onClick={this.handleClick.bind(this)} />


          <img src={angel} id="avatar2" className="profile-avatar" alt="avatar" onClick={this.handleClick.bind(this)} />


          <img src={clown} id="avatar3" className="profile-avatar" alt="avatar" onClick={this.handleClick.bind(this)} />


          <img src={mermaid} id="avatar4" className="profile-avatar" alt="avatar"onClick={this.handleClick.bind(this)} />


          <img src={dragon} id="avatar5" className="profile-avatar" alt="avatar" onClick={this.handleClick.bind(this)} />

        </div>
      }

    return (
      <div className="box row w900">
        <header className="profile-header">
          <div className="profile-avatar-div col-4-sm col-12-xs">
            <img src={this.state.imageChoice} id="avatar1" className="profile-avatar" alt="avatar" onClick={this.handleClick.bind(this)} />
          </div>
          <div className="profile-level-div col-6-sm col-12-xs">
            <h2 className="profile-level-title">Level <span>{level}</span></h2>
          </div>
          {galleryNode}
        </header>
      </div>

    );
  }
}


const mapStateToProps = state => ({
    choreList: state.choreList
});

export default connect(mapStateToProps)(Profile);
