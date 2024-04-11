import { useEffect,useState } from "react";
import Header from "./Header";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import {FaHeart,FaRegHeart} from 'react-icons/fa';
import './Home.css';
import API_URL from "./constants";


function LikedProducts(){
    const [products,setproducts]=useState([]);
    const [cproducts,setcproducts]=useState([]);
    
    const [search,setsearch]=useState('');
    
    useEffect(()=>{
        const url=API_URL+'/liked-products';
        let data={ userId: localStorage.getItem('userId')}
        axios.post(url,data)
        .then((res)=>{
            
            if(res.data.products){
                    setproducts(res.data.products);
            }
        })
        .catch((err)=>{
            
            alert("server Error");
        })
    },[])

    const handlesearch=(value)=>{
        
        setsearch(value);
    }

    const handleClick=()=>{
        
        let filteredProducts=products.filter((item)=>{
            if(item.pname.toLowerCase().includes(search.toLowerCase())|| item.pdesc.toLowerCase().includes(search.toLowerCase()) || item.pcategory.toLowerCase().includes(search.toLowerCase())){
                return item;
            }
        })
        setcproducts(filteredProducts)
        
    }

    const handleCategory=(value)=>{
       
        let filteredProducts=products.filter((item,index)=>{
            
            if(item.pcategory==value){
                return item;
            }
            
        })
        setcproducts(filteredProducts)
    }

    const handleLike=(productId)=>{
        let userId=localStorage.getItem('userId');
        console.log('userId',"productid",productId,userId);
        const url=API_URL+'/like-product';
        const data={userId,productId}
        axios.post(url,data)
        .then((res)=>{
            
            if(res.data.message){
                alert(res.data.message)
            }
        })
        .catch((err)=>{
            
            alert("server Error");
        })
    }
    
    return(
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick}/>
            <Categories handleCategory={handleCategory}/>
           
           {/* {!!localStorage.getItem('token') && <Link to="/add-product">Add Product</Link>} */}
          
           <div className="d-flex justify-content-center flex-wrap">
           {cproducts&&products.length>0&&
           cproducts.map((item,index)=>{
            return (
                <div key={item._id} className="card m-3 ">
                        <div onClick={()=>handleLike(item._id)} className="icon-con">
                     <FaHeart className="icons"/>
                     </div>
                        <img width="300px" height="200px" src={API_URL+'/'+ item.pimage}/>
                        <p className="m-2">{item.pname} |{item.pcategory}</p>
                        <p className="m-2 text-success">{item.pdesc}</p>
                        <h3 className="m-2 text-danger">{item.pprice}</h3>
                        


                </div>

            )
           }) }
           </div> 

           <h1>All Results</h1>

           <div className="d-flex justify-content-center flex-wrap">
           {products&&products.length>0&&
           products.map((item,index)=>{
            return (
                <div key={item._id} className="card m-3 ">
                     <div onClick={()=>handleLike(item._id)}  className="icon-con">
                     <FaHeart className="icons"/>
                     </div>
                        <img width="300px" height="200px" src={API_URL+'/'+ item.pimage}/>
                        <p className="m-2">{item.pname} |{item.pcategory}</p>
                        <p className="m-2 text-success">{item.pdesc}</p>
                        <h3 className="m-2 text-danger">{item.pprice}</h3>
                        


                </div>

            )
           }) }
           </div> 
          
        </div>
    )
}

export default LikedProducts;