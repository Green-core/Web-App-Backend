// const mongoose = require("mongoose");

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

//   role: {
//     type: String,
//     default: "user",
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
