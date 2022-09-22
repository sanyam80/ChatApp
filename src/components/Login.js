import React from 'react';
import "../App.css";
import {auth,provider} from "../firebase.js";
import { actionTypes } from './Reducer';
import { useStateValue } from './StateProvider';

const Login = () => {
  const[{},dispatch] = useStateValue();
    const signIn = ()=>{
        auth.signInWithPopup(provider).then(result=>{
          dispatch({type:actionTypes.SET_USER,user:result.user})
        }).catch(error=>alert(error.message))
    }
  return (
    <div className='login'>
    <div className = "login_container">
        <img src = "https://www.farmizen.com/wp-content/uploads/2020/10/79dc31280371b8ffbe56ec656418e122.png" alt = "watsapp"></img>
        <div className = "login_text">
            Sign In to watsapp
        </div>
        <button onClick = {signIn}>Sign In With Google</button>
    </div>
    </div>
  )
}

export default Login