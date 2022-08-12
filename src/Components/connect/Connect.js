import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset } from "../../firebase";
import styles from './Connect.module.css'


window.fbAsyncInit = function() {
    window.FB.init({
      appId      : '926713102054858',
      cookie     : true,
      xfbml      : true,
      version    : 'v14.0'
    });
      
    window.FB.AppEvents.logPageView();     
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


const Connect = () => {
    let navigate = useNavigate()
    
      function signinwithfb()
      {
         window.FB.login(function(response) {
          navigate("/dashboard");
          console.log(response);
        });
      }
    
    return (
        <div className={styles.card}>
            {(
                <div className={styles.container}>
                <div className={styles.heading}> Facebook Page Integration </div>
                <div>
                    <button onClick={signinwithfb} className={styles.submitButton}>Connect Page</button>
                </div>
            </div>
            )}
            
        </div>
    );
};

export default Connect;
