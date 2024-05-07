
//const morgan=require('morgan')
const error=require('./middleware/error')
const Joi=require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const config=require('config')
const helmet=require('helmet')
const expre=require('express');
const genres=require('./routes/genres')
const home=require('./routes/home')
const mongoose=require('mongoose')
const users=require('./routes/user')
const authi=require('./routes/authi')
const swaggerJsdoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express')
const customer=require('./routes/customers')
const rental=require('./routes/rental')
const movies=require('./routes/movie')
const swaggerDocument=require('./swagger.json')

// if(!config.get('jwprivate')){
//     console.error('FATAL ERROR:jwprivate is not defined')
//     process.exit(1);
// }

//we are going to call the middleware we created in logger file
//const logger=require('./middleware/logger')
//here we are going to call the authentication middleware module we created 
//const auth=require('./middleware/auth')

const { indexOf } = require('underscore');
//const { error } = require('joi/lib/types/lazy');
const router = require('./routes/genres');

mongoose.connect('mongodb://localhost/genres')
.then(()=>console.log('connected successfully'))
.catch(err=>console.error('not connected'))

const movie=expre();

//const swaggerSpec=swaggerJsdoc(options)

//this is another built in middleware
//this extended tell us that we can pass complex objects
//this one static help us to store static things like css,images as a parameter we put there a folder that has them
movie.use(expre.json());
movie.use(expre.urlencoded({extended:true}));
movie.use(expre.static('public'))
movie.use(helmet())//helmet is an example of third party middle ware which helps to secure the http by giving it different headers
movie.use('/api/genres',genres)
movie.use('/api/users',users)
movie.use('/api/authi',authi)
movie.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
movie.use('/api/customers',customer)
movie.use('/api/rentals',rental)
movie.use('/api/movies',movies)

movie.use(error)

//movie.use('/',home);

//___ configuration ____
//console.log(`Application name: ${config.get('name')}`)
//console.log(`mail server: ${config.get('mail.host')}`)
//console.log(`mail password: ${config.get('mail.password')}`)


/*if(movie.get('env')==='development'){
    movie.use(morgan('tiny'))//tiny is a format in which you want the url to come in,morgan when you do a request it will show you the url you put
    console.log('Morgan enabled...')
}*/

//_____knowing the environment_______
//console.log(`NODE_ENV:${process.env.NODE_ENV }`)
//console.log(`app:${movie.get('env')}`);

//here we are using the other called file
 //movie.use(logger)
 //movie.use(auth)


 const port = process.env.PORT || 3000
movie.listen(port,()=>{
    console.log(`The movie is running of port ${port}...`)
})