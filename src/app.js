const cors = require("cors");
const express = require("express");

const app = express();
const contactModel = require("./model/contactModel");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.route("/v1/contacts")
.post(async(req,res)=>{
    try{
        const data = await contactModel.create({...req.body});
        res.status(201).json(data);
    }
    catch(e){
        if(e.keyValue){
            if(e.keyValue.email){

                return res.status(406).json({
                    error:"email is duplicate"
                    
                }) 
            }else{
                return res.status(406).json({
                    error:"phone is duplicate"
                    
                }) 
            }
        }
        // console.log(e);
        if(e.errors.email){
            return res.status(406).json({
                error:`Missing required field(s):email`
            })
        }
        if(e.errors.phone){
            return res.status(406).json({
                error:`Missing required field(s):phone`
            })
        }

        
        res.sendStatus(500);
        
    }
})
.get(async(req,res)=>{
    try{
        const data = await contactModel.find();
        res.json(data);

    }catch{
        res.sendStatus(500);
    }
})

app.route("/v1/contacts/:id")
.get(async(req,res)=>{
    try{
        let id = req.params.id;
        const data = await contactModel.findOne({_id:id});
        if(data){
            res.json(data);
        }else{
            res.status(404).json({
                error:"There is no contact with that id"
            })
        }
    }
    catch(e){
        res.sendStatus(500);
    }
})
.delete(async(req,res)=>{
    try{
        let id = req.params.id;
        const data = await contactModel.deleteOne({_id:id});
        res.sendStatus(204);

    }
    catch(e){
        res.sendStatus(500);
    }
})
.put(async(req,res)=>{
    try{
        let id = req.params.id;
        const data = await contactModel.findOneAndReplace({_id:id},{...req.body});
        if(data){
            res.sendStatus(204);
        }else{
            res.status(404).json({
                error: "There is no contact with that id"
                }
                )
        }

    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})
.patch(async(req,res)=>{
    try{
        let id = req.params.id;
        
        const data = await contactModel.findByIdAndUpdate({_id:id},{...req.body});
        if(data){
            res.sendStatus(204);
        }else{
            res.status(404).json({
                error: "There is no contact with that id"
                }
                )
        }
        
    }catch{
        res.sendStatus(500);
    }
})


app.use("*",(req,res)=>{
    res.sendStatus(404);
})
module.exports = app;
