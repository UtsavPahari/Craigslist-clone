import Header from "./Header";
import "./Signup.css";
import { Link } from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function SignUp(){
    const  [username,setusername]=useState('');
    const  [email,setemail]=useState('');
    const  [password,setpassword]=useState('');
    const  [cpassword,setcpassword]=useState('');
    const  [Mobile,setMobile]=useState('');
   
    const  handleApi=()=>{
        const url='http://localhost:4000/signup';
        const data={username,password, Mobile, email}
        

        axios.post(url,data)
        .then((res)=>{
            
            if(res.data.message){
                alert(res.data.message)
            }
        })
        .catch((err)=>{
            
            alert('Server Err');
        })
    }
    return(
    <div>
        <Header/>
        <div class="container">
        <h2>Sign Up to the Account</h2>
       
            <div class="input-group">
                <label for="name"></label>
                <input className = "form-control" placeholder="Name" type="text" value={username} onChange={(e)=>{
                    setusername(e.target.value)
                }} id="name" name="name" required/>
            </div>
            <div class="input-group">
                <label for="email"></label>
                <input className = "form-control" placeholder="Email" type="email" value={email} onChange={(e)=>{
                    setemail(e.target.value)
                }} id="email" name="email" required/>
            </div>
            <div class="input-group">
                <label for="Mobile"></label>
                <input placeholder="Mobile" type="number" value={Mobile} onChange={(e)=>{
                    setMobile(e.target.value)
                }} id="Mobile" name="Mobile" required/>
            </div>
            <div class="input-group">
                <label for="password"></label>
                <input placeholder="Password" type="password" value={password} onChange={(e)=>{
                    setpassword(e.target.value)
                }} id="password" name="password" required/>
            </div>
            <div class="input-group">
                <label for="confirm_password"></label>
                <input placeholder="Confirm Password" type="password" value={cpassword} onChange={(e)=>{
                    setcpassword(e.target.value)
                }} id="confirm_password" name="confirm_password" required/>
            </div>
            <div class="input-group">
                <input type="checkbox" id="terms" name="terms" required/>
                <label for="terms">I agree to the terms and conditions</label>
            </div>
            <button class="btn" onClick={handleApi}>Sign Up</button>
            <p>Already have an Account?</p>
            <Link to="/login"><button type="submit" class="btn">Sign  In</button></Link>
        
    </div>
    
    </div>
    )
}

export default SignUp;