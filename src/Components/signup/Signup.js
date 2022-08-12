import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset } from "../../firebase";
import styles from './Signup.module.css'


const Signup = () => {
    let navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const register = () => 
    {
        if (!name) 
            alert("Please enter name");
        if (!email) 
            alert("Please enter email");
        if (!password) 
            alert("Please enter password");
        else
        {
            registerWithEmailAndPassword(name, email, password);
            setCurrentComponent('login');
        }
    };
    const login = () => 
    {
        if (!email) 
            alert("Please enter email");
        if (!password) 
            alert("Please enter password");
        else
        {
            logInWithEmailAndPassword(email, password);
            
        }
    };
    const [currentComp, setCurrentComponent] = useState('signup');
    return (
        <div className={styles.card}>
            {currentComp === "signup"? (
                <div className={styles.container}>
                <div className={styles.heading}>Create Account</div>
                <div className={styles.inputField}>
                    <div className={styles.fieldTitle}>Name</div>
                    <input className={styles.input} type="text" value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name" />
                </div>
                <div className={styles.inputField}>
                    <div className={styles.fieldTitle}>Email</div>
                    <input className={styles.input} type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"/>
                </div>
                <div className={styles.inputField}>
                    <div className="fieldTitle">Password</div>
                    <input className={styles.input} type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"/>
                </div>
                <div>
                    <input type="checkbox" /> Remember Me
                </div>
                <div>
                    <button onClick={register} className={styles.submitButton}>Sign Up</button>
                </div>
                <div className={styles.centeredtag}>
                    Already have an account? <Link to="/" onClick={() => setCurrentComponent('login') }>Login</Link>
                </div>
            </div>
            ): currentComp === "login"?(
                <div className={styles.container}>
                <div className={styles.heading}>Login to your account</div>
                <div className={styles.inputField}>
                    <div className={styles.fieldTitle}>Email</div>
                    <input className={styles.input} type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"/>
                </div>
                <div className={styles.inputField}>
                    <div className="fieldTitle">Password</div>
                    <input className={styles.input} type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"/>
                </div>
                <div >
                    <input type="checkbox"/> Remember Me
                </div>
                <div>
                    <button onClick={login} className={styles.submitButton}>Login</button>
                </div>
                <div className={styles.centeredtag}>
                    <Link to="/" onClick={() => setCurrentComponent('password')}>Forget Password?</Link>
                </div>
                <div className={styles.centeredtag}>
                    New to MyApp? <Link to="/" onClick={() => setCurrentComponent('signup')}>Signup</Link>
                </div>
            </div>
            ):(
                <div className={styles.container}>
                <div className={styles.heading}>Password Reset</div>
                <div className={styles.inputField}>
                    <div className={styles.fieldTitle}>Email</div>
                    <input className={styles.input} type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"/>
                </div>
                <div>
                    <button onClick={() => sendPasswordReset(email)}className={styles.submitButton}>Send Reset Mail</button>
                </div>
                <div className={styles.centeredtag}>
                    Continue to Login? <Link to="/" onClick={() => setCurrentComponent('login')}>Login</Link>
                </div>
            </div>
            )}
            
        </div>
    );
};

export default Signup;
