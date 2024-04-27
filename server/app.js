const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5001
const { MONGOURI } = require('./keys')


// const CustomMiddleware =(req,res,next)=>{
//   console.log("middleware executed!!!!")
//   next()
// }
// app.use(CustomMiddleware)


// app.get('/',(req,res)=>{
  //   console.log("home")
  //   res.send("hello world")
  // })
  
  
  require('./models/user')
  require('./models/post')

 app.use(express.json())
 app.use(require('./routes/auth'))
 app.use(require('./routes/post'))
 app.use(require('./routes/user'))

// mongoose.set('strictQuery', true)

// mongoose.connect(MONGOURI)
// ,{
  // useNewUrlParser:true,
  // useUnifiedTopology:true
  // })
   mongoose.set('strictQuery',true);
  mongoose.connect(MONGOURI)
  mongoose.connection.on("connected", () => {
    console.log("connected to mongo yeahhh")
  })
  mongoose.connection.on("error", (err) => {
    console.log("err connecting", err)
  })
  
  app.listen(PORT,()=>{
    console.log("server is running on",PORT)
  })
