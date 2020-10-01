// const mongoose = require("mongoose");
// const bcrypt =require('bcrypt');

// // Create Schema
// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },

//   password: {
//     type: String,
//     required: true,
//   },

//   mobile: {
//     type: String,
//     required: true,
//   },

//   role: {
//     type: String,
//     default: "Admin",
//     required: true,
//   },

//   created_at: {
//     type: Date,
//     default: Date.now,
//     required: true,
//   },

//   updated_at: {
//     type: Date,
//     default: Date.now,
//     required: true,
//   },

//   modules: [
//     {
//       module_id: {
//         type: String,
//         required: true,
//       },
//       connected_date: {
//         type: String,
//         default: Date.now,
//         required: true,
//       },
//     },
//   ],
// });

// UserSchema.methods.generateHash=function(password){
//   return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);

// };
// UserSchema.methods.validPassword=function(password){
//   return bcrypt.compareSync(password,this.password);
// };


// module.exports = mongoose.model("user", UserSchema);

const mongoose = require("mongoose");
const bcrypt =require('bcrypt');

// Create Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "Admin",
    required: true,
  },
  
  mobile:{ 
    type: String, 
    required: false,
  },
  resetPasswordToken :{
    type:String,
    default:null,
    required: false,
  },
  resetPasswordExpire :{
    type:Date,
    default:null,
    required: false,
  },

  emailVerify:{
    type:Boolean,
    default:false,
  },

  created_at: {
    type: Date,
    default: new Date(),
    required: true,
  },

  updated_at: {
    type: Date,
    default: new Date(),
    required: true,
  },

  modules: [
    {
      module_id: {
        type: String,
        required: true,
      },
      connected_date: {
        type: String,
        default: new Date(),
        required: true,
      },
    },
  ],
});

userSchema.methods.generateHash=function(password){
     return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
    
    };
    userSchema.methods.validPassword=function(password){
      return bcrypt.compareSync(password,this.password);
    };

module.exports = mongoose.model("user", userSchema);
