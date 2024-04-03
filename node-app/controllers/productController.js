const mongoose = require('mongoose');
const Products = mongoose.model('Products', { 
    pname: String, 
    pdesc: String, 
    pprice:String, 
    pcategory:String, 
    pimage:String,
    pimage2:String,
    addedBy : mongoose.Schema.Types.ObjectId
 });



module.exports.search=(req, res ) => {

    let search = req.query.search;
    Products.find({
        $or : [
            {pname : { $regex : search }},
            {pdesc : { $regex : search }},
            {pprice : { $regex : search }},
            {pcategory : { $regex : search }},
        ]
    })
    .then((results)=>{
        
        res.send({message:'success',products:results})
    })
    .catch((err)=>{
        res.send({message:'server err.'})
    })

}


module.exports.addProduct=(req,res)=>{

   
    const pname=req.body.pname;
    const pdesc=req.body.pdesc;
    const pprice=req.body.pprice;
    const pcategory=req.body.pcategory;
    const pimage=req.files.pimage[0].path;
    const pimage2=req.files.pimage2[0].path;
    const addedBy=req.body.userId;
    const product=new Products({pname:pname,pdesc:pdesc,pprice:pprice,pcategory:pcategory,pimage:pimage, pimage2, addedBy})
    product.save()
    .then(() => {
        res.send({message:'saved success.'})
    })
    .catch(()=>{
        res.send({message:'server err.'})
    })

}



module.exports.getProducts=(req,res)=>{
    const catName = req.query.catName;
    let _f = { }
    if(catName){
        _f = { category : catName}
    }
    
 Products.find(_f )
    .then((result)=>{
        
        res.send({message:'success',products:result})
    })
    .catch((err)=>{
        res.send({message:'server err.'})
    })
}



module.exports.getProductsById=(req,res)=>{
    
    Products.findOne({_id: req.params.pId})
        .then((result)=>{
            
            res.send({message:'success',products:result})
        })
        .catch((err)=>{
            res.send({message:'server err.'})
        })
    }


    module.exports.myProducts=(req,res)=>{

        const userId = req.body.userId;
        Products.find({addedBy: userId})
            .then((result)=>{
                
                res.send({message:'success',products:result})
            })
            .catch((err)=>{
                res.send({message:'server err.'})
            })
        }

