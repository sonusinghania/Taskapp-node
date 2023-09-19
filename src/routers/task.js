const express=require('express')
const Task=require('../models/task')

const auth = require('../middleware/auth')
const User = require('../models/user')
const router = new express.Router()


// this is for the task
router.post('/tasks', auth, async(req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
      ...req.body,
      owner:req.user._id
    })
  try{
await task.save()
res.status(201).send(task)
  }catch(e){
res.status(400).send(e)
  }
  });
  
//GET /tasks?Complted=true
//GET /tasks?limit=10&skip=20

router.get('/tasks', auth,async(req,res)=>{
    const match = {}
    const sort = {}

    if(req.query.completed){
match.completed = req.query.completed ==='true'
    }

    if(req.query.sortBy){
      const parts = req.query.sortBy.split(':')
      sort [parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
      try{
  //  const tasks = await Task.find({owner: req.user._id})
  const limit = parseInt(req.query.limit) || 10; // Default to 10 tasks per page
  const page = parseInt(req.query.page) || 1; // Default to page 1
  
  const skip = (page - 1) * limit;
  
  await req.user.populate({
    path: 'tasks',
    match,
    options: {
      limit,
      skip,
      sort
    },
  });
  
   res.send(req.user.tasks)
      }catch(e){
res.status(500).send()
      }
    })
    

    router.get('/tasks/:id', auth, async (req, res) => {
      const _id = req.params.id; // Access the 'id' parameter using req.params.id
      try {
        // const task = await Task.findById(_id);

        const task = await Task.findOne({_id,owner:req.user._id})
    
        if (!task) {
          return res.status(404).send();
        }
    
        res.send(task); // Send the task as a response when it's found
      } catch (e) {
        res.status(500).send();
      }
    });
    
    router.patch('/tasks/:id', auth, async (req, res) => {
      const updates = Object.keys(req.body);
      const allowUpdates = ['description', 'completed']; // Define the allowed updates
    
      const isValidOperation = updates.every((update) => allowUpdates.includes(update));
    
      if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' });
      }
    
      try {
        // Find the task by ID and update it
      
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

    // const task = await Task.findById(req.params.id)
   
      // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
          return res.status(404).send();
        }
        updates.forEach((update)=> task[update]=req.body[update])
        await task.save()
        res.send(task);
      } catch (e) {
        res.status(500).send(e);
      }
    });

    router.delete('/tasks/:id', auth, async(req,res)=>{
      try{
        // const task= await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})
        if(!task){
          return res.status(404).send()
        }
        res.send(task)
      }catch(e){
    res.status(500).send()
      }
     
    })
    
    module.exports=router
