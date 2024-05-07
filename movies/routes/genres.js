
const auth=require('../middleware/auth')
const express=require('express');
const Joi=require('joi');
const string = require('joi/lib/types/string');
const router=express.Router()
const mongoose=require('mongoose')
const admin=require('../middleware/admin')
const{Genre,validating}=require('../models/genre')
// const genres=[
//     {id:1,name:'course1'},
//     {id:2,name:'course2'},
//     {id:3,name:'course3'},
// ]

router.get('/',async (req,res)=>{
    try{
        const genres=await Genre.find().sort('name')
        res.send(genres);
    }
    catch(ex){
       next(ex)
    }
    
});


router.get('/:id', async(req,res)=>{
    const genre=await Genre.findById(req.params.id)
    //const genre=genres.find(m=>m.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send("the genre with the given id was not found");
    res.send(genre);
})

router.post('/',auth,async(req,res)=>{
    const{error}=validating(req.body)
    if(error) return res.status(400).send("please enter valid name and should be minimum 3 characters")
let genre= new Genre({
    //id:genres.length+1,
    name:req.body.name
})
//genres.push(genre)
 genre=await genre.save()
res.send(genre);
});

router.put('/:id',auth,async(req,res)=>{
    const{error}=validating(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre=await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
    //const genre=genres.find(m=>m.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send("the genre with the given id was not found");

     //genre.name=req.body.name;
     res.send(genre)

});


router.delete('/:id',[auth,admin],async(req,res)=>{
    const genre= await Genre.findByIdAndDelete(req.params.id)
    //const genre=genres.find(m=>m.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send("the genre with the given id was not found");
    //const index=genres.indexOf(genre);
    //genres.splice(index,1);
    res.send(genre);
})

module.exports=router
