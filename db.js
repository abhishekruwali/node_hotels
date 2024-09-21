// responsible for database connectivity with node js


const mongoose=require('mongoose');

//Define the MongoDB connection URL
const mongoURL='mongodb://127.0.0.1:27017/hotels'// Replace 'mydatabase' with your database name

// Set up mongodb connection

mongoose.connect(mongoURL,{
    
    // useUnifiedTopology:true
})

// get the default connection
// Mongoose maintains a default connection object representing the MongoDb connection
const db=mongoose.connection;


// define event listeners for database connection
db.on('connected',()=>{
    console.log('Connected to MongoDb server');
})

db.on('error',(err)=>{
    console.log('Connected to MongoDb server',err);
})

db.on('disconnected',()=>{
    console.log('Connected to MongoDb server');
})

// Eexport the database connectivity
module.exports=db;

