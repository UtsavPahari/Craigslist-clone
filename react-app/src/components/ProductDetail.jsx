import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios  from "axios";
import Header from "./Header";
import API_URL from "./constants";




function ProductDetail(){
    const [products,setproduct]=useState()
    const [user,setuser]=useState()
    console.log(user);
    const p=useParams();

    
    useEffect(()=>{
        const url=API_URL+'/get-product/'+p.productId;
        axios.get(url)
        .then((res)=>{
            
           console.log(res)
           if(res.data.products){
            setproduct(res.data.products);
           }
        })
        .catch((err)=>{
            
            alert("server Error");
        })
    },[])

    const handleContact= (addedBy)=>{
        console.log('id' , addedBy)
        const url=API_URL+'/get-user/' + addedBy;
        axios.get(url)
        .then((res)=>{
            
           console.log(res)
           if(res.data.user){
            setuser(res.data.user);
           }
        })
        .catch((err)=>{
            
            alert("server Error");
        })
    }
    return(<>
       

            <Header/>
            Product Details:
            <div >
            
          {products&&<div className="d-flex justify-content-between flex-wrap">
                <div>
                    <img className = "m-2" width="400px" height="200px" src={API_URL+'/'+products.pimage} alt="" />
                   {products.pimage2 &&  <img className = "m-2" width="400px" height="200px" src={API_URL+'/'+products.pimage2} alt="" />}
                    <h6>Product Details:</h6>
                    {products.pdesc}
                    
                </div>
                <div>
                <h3 className="m-2 price-text">${products.pprice}</h3>
                        <p className="m-2">{products.pname} |{products.pcategory}</p>
                        <p className="m-2 text-success">{products.pdesc}</p>
                        {

                            <button onClick={()=>handleContact(products.addedBy)}>Show Contact Details</button>
                        }
                            {user && user.username && <h4>{user.username}</h4>}
                            {user && user.Email && <h6>{user.Email}</h6>}
                           { user && user.Mobile && <h4>{user.Mobile}</h4>}
                            
                       
                        
                       
                        
                </div>
            </div>}
        </div>
        </>
    )
}


export default ProductDetail;