const express = require('express')
const app = express()

const mongoose = require('mongoose')
const route = require('./routes/route')

const socketConfig = require('./sockets/socket');


app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use( multer().any())

// mongodb+srv://sonalijana2000:<db_password>@soumen.i8t2e.mongodb.net/?retryWrites=true&w=majority&appName=soumen
mongoose.connect("mongodb+srv://sonalijana2000:soumen433%40@soumen.i8t2e.mongodb.net/chat-app", {
    useNewUrlParser: true
})
// mongodb+srv://sonalijana2000:soumen433%40@soumen.i8t2e.mongodb.net/
.then( () => console.log("MongoDb is connected"))
.catch( err => console.log(err))

app.use('/', route)

app.all('*', function(req,res){
    throw new Error("Bad Request")
})

app.use(function(e,req,res,next){
    if(e.message=="Bad Request")
    return res.status(400).send({error : e.message})
})

let server=app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
    console.log(server,"servv")
    socketConfig(server);
});

module.exports = { app, server };