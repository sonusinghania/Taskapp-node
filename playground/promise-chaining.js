require("../src/db/mongoose");

const User = require('../src/models/user');
// 64f83efd70f0fb4c9e8aa0c6

// User.findByIdAndUpdate('64f84e9d83e6759b810624a6', { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 }); // Corrected function name
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount=async(id,age)=>{
  const user = await User.findByIdAndUpdate(id,{age})
  const count = await User.countDocuments({age})
  return count
} 
updateAgeAndCount('64f84e9d83e6759b810624a6',2).then((count)=>{
  console.log(count)
}).catch((e)=>{
  console.log(e)
})
