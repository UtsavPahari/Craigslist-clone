
// import { Link, useNavigate } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import categories from './CategoriesList';

function Categories(props){
const navigate = useNavigate();

return(
<div className='cat-container' >
    
   
    <div>
    
        {categories && categories.length>0 &&
        categories.map((item,index)=>{
            return (
            <span onClick={()=>
                navigate('/category/' + item)
            } key={index} className='category'>{item} </span>
            )
        })}</div>    
    </div>
        
    )
}

export default Categories;