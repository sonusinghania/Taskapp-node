require("../src/db/mongoose");

const Task = require('../src/models/task');
// 64f83efd70f0fb4c9e8aa0c6

// Task.findByIdAndDelete('64f844cb65ecaa2f21fc9859')
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ age: 1 }); // Corrected function name
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id)=>{
  const task= await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({completed:false})
  return count
}
deleteTaskAndCount('64f8453200982d2ae47795ae').then((count)=>{
  console.log(count)
}).catch((e)=>{
  console.log(e)
})


