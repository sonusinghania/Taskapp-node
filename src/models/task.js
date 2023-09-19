const mongoose = require('mongoose');
// const validator = require('validator');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false, // Set the default value directly in the schema
  },
owner: {
  type: mongoose.Schema.Types.ObjectId,
  required:true,
  ref:'User'
}

},{
  timestamps:true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;


        //   task.save()
        //     .then(() => {
        //       console.log(task);
        //     })
        //     .catch((error) => {
        //       console.error('Error:', error);
        //     });