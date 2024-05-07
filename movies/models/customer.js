const { required, boolean } = require('joi');
const { min, max } = require('lodash');
const mongoose=require('mongoose');
const Joi=require('joi')

const customerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:20
        },
    isGold:{
        type:Boolean,
        default:false

    },
    phone:{
        type:String,
        min:10,
        max:10
    }
})

const Customer=mongoose.model('customer',customerSchema);

function validateCustomer(customer){
    const schema=Joi.object({
name:Joi.string().min(6).max(20).required(),
isGold:Joi.boolean(),
phone:Joi.string().min(10).max(10).required()
    })
    return schema.validate(customer)
}
exports.Customer=Customer
exports.validateCustomer=validateCustomer