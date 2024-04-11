import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import API_URL from "./constants";

function MyProfile(){
    const [user,setuser]=useState({});
    useEffect(()=>{
        let url=API_URL+'/my-profile/'+ localStorage.getItem('userId');
        axios.get(url)
        .then((res)=>{
           console.log(res.data) 
           if(res.data.user){
            setuser(res.data.user);
           }
           
        })
        .catch((err)=>{
            
            alert("server Error");
        })
    })
    return (
        
        <div>
            <Header/>
            <div className="m-3 p-3">

            
           <h3 className="text-center mt-3">USER PROFILE</h3> 

           

           <table className="table table-dark table-bordered">
            <thead>
            <tr>
                <td>UserName</td>
                <td>Email_Id</td>
                <td>Mobile</td>
            </tr>

            </thead>
           <tbody>
           <tr>
                <td>{user.username}</td>
                <td>{user.Email}</td>
                <td>{user.Mobile}</td>
            </tr>
           </tbody>
            
           </table>
           </div>
        </div>
    )

}
export default MyProfile;