const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)  //here it is use to define the path of router

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

//it is middleware 

// app.use((req,res,next)=>{
// if(req.method === 'GET'){
// res.send('Get Request are disabled')
// }else{
//   next()
// }
// })

// Here we used the multer

// const multer = require('multer')
// const upload = multer({
//   dest : 'Images',
//   limits:{
//     fileSize: 2000000
//   },
//   fileFilter(req, file, cb){
//   if(!file.originalname.match(/\.(doc|docx)$/)){
// return cb(new Error('Please Upload a document'))
//   }

//   cb(undefined, true)
//     // cb( new Error('File must be a PDF'))
//           // cb(undefined, true)
//           //  cb(undefined, false)
//   }
// })

// app.post('/upload',upload.single('upload'),(req,res)=>{
// res.send()
// },(error,req,res,next)=>{
//   res.status(400).send({error: error.message})
// })





// this code is used to test the jsonwe token working

// const jwt = require('jsonwebtoken')

// const myFunction = async () =>{
//  const token = jwt.sign({ _id: 'abc123'},'ThisismynewCourse',{ expiresIn: '7 days'})
// console.log(token)
// const data = jwt.verify(token,'ThisismynewCourse')
// console.log(data)

// }

// myFunction()

// const pet = {
//   name:"tom"
// }

// pet.toJSON = function() {
//   console.log(this)
//   return this
// }

// console.log(JSON.stringify(pet))


// this is used for the task features tried out 


// const Task = require('./models/task');
// const User =require('./models/user')

// const main = async () => {



  // const task = await Task.findById('65029677673c68224771d1e5');
  // await task.populate('owner'); // Remove .execPopulate()
  // console.log(task.owner);
// const user =await User.findById('65019f33851ea943dce34e0b')
// await user.populate('tasks')
// console.log(user.tasks)
// };

// main();
