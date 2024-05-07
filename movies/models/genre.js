
const express=require('express');
const Joi=require('joi');
const mongoose=require('mongoose')
// const genres=[
//     {id:1,name:'course1'},
//     {id:2,name:'course2'},
//     {id:3,name:'course3'},
// ]
const genreSchema=new mongoose.Schema({
    name:{type:String,
        required:true,
        minlength:5,
    maxlength:100
    }
})

const Genre=  mongoose.model('genre',genreSchema)
function validating(genre){
    const diagram=Joi.object({name:Joi.string().min(3).required()})
    
    return diagram.validate(genre);
}
module.exports.genreSchema=genreSchema
exports.Genre=Genre
module.exports.validating=validating