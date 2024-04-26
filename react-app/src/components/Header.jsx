import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';  
import { useState } from 'react';
import API_URL from './constants';


function Header(props){
    const [showOver,setshowOver]=useState(false)
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
    }

   
return(
<div className=' header-container d-flex justify-content-between' >
    
<div class = "Left_header"><Link className='links' to="/">Craigslist</Link>
    
    <input className='search' type="text" 
    value={props && props.search} 
    onChange={(e)=>props.handlesearch  &&   props.handlesearch(e.target.value)
    } 
    />
    <button className='search-btn' onClick={()=>props.handleClick && props.handleClick()}><FaSearch/></button>
    </div>
   
  
    
    <div
    onClick={()=>{
        setshowOver(!showOver)
    }}
    style = {{display: 'flex', justifyContent: ' center ', alignItems:'center',
    background : 'blueviolet',color:'white' ,fontSize :'14px', width : '40px', height : '50px', borderRadius: '50%'}}>N</div>
    { showOver && <div style ={{
        minHeight : '100px',
        width: '200px',
        position : 'absolute',
        top : '0',
        right : '0',
        zIndex : 1,
        marginTop : '50px',
        marginRight: '50px',
        color:'red',
        background: 'blueviolet',
        borderRadius: '7px',
    }}>


<div>
    {!!localStorage.getItem('token') && 
    <Link to="/add-product">
        <button className='btn'>Create a Post</button>
        </Link>}
    </div>
    <div> 
        {!!localStorage.getItem('token') &&
         <Link to="/liked-products">
            <button className='btn'>Favorites</button>
            </Link>}
    </div>
    <div> 
        {!!localStorage.getItem('token') &&
         <Link to="/my-products">
            <button className='btn'>My Products</button>
            </Link>}
    </div>
    <div> 
        {!localStorage.getItem('token')?
        <Link to="/login">Login</Link>:
        <button class="btn" onClick={handleLogout}>LogOut</button>}
    </div>
    

        
   

    

    </div>
    }

    
    
    </div>
    
        
    )
    
}

export default Header;