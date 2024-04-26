import { useEffect, useState } from "react";
import Header from "./Header";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import categories from "./CategoriesList";
import API_URL from "./constants";


function AddProduct(){
    const navigate=useNavigate()
    
    
    const [pname,setpname]=useState('');
    const [pdesc,setpdesc]=useState('');
    const [pprice,setprice]=useState('');
    const [pcategory,setpcategory]=useState('');
    const [pimage,setpimage]=useState('');
    const [pimage2,setpimage2]=useState('');
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])
    
    const handleApi=()=>{
        
        const formData=new FormData();
        formData.append('pname',pname)
        formData.append('pdesc',pdesc)
        formData.append('pprice',pprice)
        formData.append('pcategory',pcategory)
        formData.append('pimage',pimage)
        formData.append('pimage2',pimage2)
        formData.append('userId',localStorage.getItem('userId'))
        const url=API_URL+'/add-product';
        axios.post(url,formData)
        .then((res)=>{
           
            if(res.data.message){
                alert(res.data.message);
               
                navigate('/')
            }
        })
        .catch((err)=>{
            alert('server err')
        })

    }
    return(
        <div>
            <Header/>
           
            <h2>Add Product Here:</h2>
            <label className="col-form-level">Product Name</label>
            <input type="text" className="form-control" value={pname} onChange={(e)=>{
                setpname(e.target.value)
            }}/>
            <label>Product Description</label>
            <input type="text" className="form-control" value={pdesc} onChange={(e)=>{
                setpdesc(e.target.value)}}/>
            <label>Product Price</label>
            <input type="text" className="form-control" value={pprice} onChange={(e)=>{
                setprice(e.target.value)}}/>
            <label>Product Category</label>
           

            <select className="form-control" value={pcategory} onChange={(e)=>{
                setpcategory(e.target.value)}}
                 >
                
                {
                    categories && categories.length > 0 && 
                    categories.map((item, index)=>{
                        return(
                            <option key = {'option' + index }>{item}</option>
                
                        )
                    })
                }
            </select>
            <label>Product Image</label>
            <input type="file" className="form-control" onChange={(e)=>{
                setpimage(e.target.files[0])}}/>
            <input type="file" className="form-control" onChange={(e)=>{
                setpimage2(e.target.files[0])}}/>
            <button onClick={handleApi} className="btn btn-primary">Submit</button>
            
           
        </div>
    )
}

export default AddProduct;