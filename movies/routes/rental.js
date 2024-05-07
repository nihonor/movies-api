const _=require('lodash')
const express=require('express')
const router=express.Router()
const{Rental,validateRental}=require('../models/rentals')
const{Customer}=require('../models/customer')
const {Movie}=require('../models/movie')
const { custom } = require('joi')
const Fawn=require('fawn')
const  mongoose  = require('mongoose')

//Fawn.init(mongoose)

router.get('/', async(req,res)=>{
    const rentals=await Rental.find().sort('-dateOut')
    res.send(rentals)
})
router.get('/:id',async(req,res)=>{
const rental=await Rental.findById(req.params.id)
res.send(rental)
})

router.post('/',async(req,res)=>{
    const {error}=validateRental(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    const customer=await Customer.findById(req.body.customerId)
    if(!customer) return res.status(400).send('Invalid Customer')

    const movie=await Movie.findById(req.body.movieId)
    if(!movie) return res.status(400).send('Invalid movie')

    if(movie.numberInStock==0) return res.status(400).send('Movie not in stock')
    let rental=new Rental({

        customer:{
        _id:customer._id,
        name:customer.name,
        phone:customer.phone
        },
        movie:{
        _id:movie._id,
        title:movie.title,
        dailyRentalRate:movie.dailyRentalRate
        }
})

        await rental.save()
        // try{
        //     new Fawn.Task()
        //     .save('rentals',rental)
        //     .update('movies',{_id:movie._id},{
        //         $inc:{numberInStock:-1}
        //     })
        //     .run()
            res.send(rental)
        //}

        // catch(ex){
        //     res.status(500).send('Something failed')
        // }
       
      
       
       
})

router.put('/:id',async (req,res)=>{
    const{error}=validateRental(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const rental=await Rental.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        price:req.body.price
    },{new:true})
    if(!rental) return res.status(404).send('The rental with the given Id was not found')

res.send(rental)

})

router.delete('/:id',async (req,res)=>{
    const rental=await Rental.findByIdAndDelete(req.params.id)
    if(!rental) return res.status(404).send('The rental with the given Id was not found')
    res.send(rental)
})
module.exports=router