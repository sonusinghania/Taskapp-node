const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Make sure 'name' is a required field
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique:true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid"); // Corrected the error message
      }
    },
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: 7,
    required: true,
    validate(value) {
      if (value.includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },

  tokens: [{
    token:{
      type:String,
      required:true
    }
  }],
  avatar: {
   type: Buffer
  }

},{
  timestamps: true
});


UserSchema.virtual('tasks',{
  ref:'Task',
  localField:'_id',
  foreignField:'owner'
})

UserSchema.methods.toJSON = function (){
  const user = this
  const userObject = user.toObject()

delete userObject.password
delete userObject.tokens
delete userObject.avatar
  return userObject
}

UserSchema.methods.generateAuthToken = async function () {
const user = this
const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse')

user.tokens= user.tokens.concat({ token })
await user.save()

return token 

}


UserSchema.statics.findByCredentials = async (email,password) =>{
const user =  await User.findOne({ email})

if(!user){
throw new Error("Unable to Login")
}
const isMatch = await bcrypt.compare(password, user.password)

if(!isMatch){
  throw new Error("Unable to login")
}

return user
}



// here used to hash the password before Savings

UserSchema.pre('save', async function(next){
const user = this 

if(user.isModified('password')){
user.password = await bcrypt.hash(user.password,8)
}


next()
})
// Delete User Task When user is removed

UserSchema.pre('remove', async function(next){
const user = this
await Task.deleteMany({ owner: user._id })
next()
})


const User = mongoose.model('User', UserSchema);

module.exports = User;
