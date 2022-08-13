import React, { Component } from "react";
import "./userProfile.css";
import { rdb } from "../../firebase"
import { ref, onValue, onChildAdded} from "firebase/database";

export default class UserProfile extends Component {

  render() {
    let profile = "";
    let fname = "";
    let lname = "";
    const dbref = ref(rdb, "messages");
    onChildAdded(dbref, (snapshot) => {
      localStorage.setItem('fname', `${snapshot.val().first_name}`);
      localStorage.setItem('lname', `${snapshot.val().last_name}`);
      localStorage.setItem('profile', `${snapshot.val().profile_pic}`);
  });
    return (
      <div className="main__userprofile">
        <div className="profile__card user__profile__image">
          <div className="profile__image">
            <img src={localStorage.getItem('profile')} />
          </div>
          <h4>{localStorage.getItem('fname') + " " + localStorage.getItem('lname')}</h4>
          
        </div>
        <div className="profile__card">
          <div className="card__header" >
            <h4>Information</h4>
          </div>
          <div className="card__content">
           <p  className="info"> 
            First name : {localStorage.getItem('fname')}<br/>
            Last name  : {localStorage.getItem('lname')}<br/>
            </p>
          </div>
        </div>
      </div>
    );
  }
}