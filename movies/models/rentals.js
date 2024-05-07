const mongoose=require('mongoose')
const Joi=require('joi')


const rentalSchema=new mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
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
        }),
        require:true
    },
    movie:{
        type:new mongoose.Schema({
            title:{
                type:String,
                required:true,
                trim:true,
                minlength:5,
                maxlength:255

            },
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:255

            }
        }),
        required:true

    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0
    }
})



function validateRental(rental){
    const schema=Joi.object({
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required()

    })
    return schema.validate(rental)
}
const Rental=mongoose.model('rental',rentalSchema)
exports.Rental=Rental
exports.validateRental=validateRental