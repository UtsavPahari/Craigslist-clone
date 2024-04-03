import Header from "./Header";
import "./Login.css";
import { Link,useNavigate } from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function Login(){
    const navigate=useNavigate()
    const  [username,setusername]=useState('');
    const  [password,setpassword]=useState('');

    const  handleApi=()=>{
        const url='http://localhost:4000/login';
        const data={username,password}
        
        axios.post(url,data)
        .then((res)=>{
            
            if(res.data.message){
                // alert(res.data.message)
                if(res.data.token){
                    localStorage.setItem('token',res.data.token)
                    localStorage.setItem('userId',res.data.userId)
                    navigate("/");
                }
                
            }
        })
        .catch((err)=>{
          
            alert('Server Err');
        })
    }
    return(
    <div>
        <Header/>
    <div class="Login_content">
    <div>
    <h1 class="logindata">Login to your Account</h1>
    </div>
      <div>
        <span class='ab'><i class="fa fa-user"></i></span>
        <input class="Username_input" type="text" value={username} onChange={(e)=>{
                    setusername(e.target.value)
                }} placeholder="UserName" required/><br/><br/>
        <span class='ab'><i class="fa fa-lock"></i></span>
        <input class="Login_password" type="password" value={password} onChange={(e)=>{
                    setpassword(e.target.value)
                }} placeholder="Password" required/><br/>
        <input type="checkbox" id="Remember" name="Remember" value="Bike"/>
        <label for="vehicle1"> Remember Me!</label><br/><br/>
        <button class="Login_button" onClick={handleApi}>Log In</button><br/>
        <p>Forgot the Password?</p>
        <p>Doesn't have an Account? <Link to="/signup">Sign Up</Link></p>
        </div> 
    </div>
    </div>
    )
}

export default Login;