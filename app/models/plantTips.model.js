const mongoose = require("mongoose");
// Create Schema
const plantTipsSchema = new mongoose.Schema({
   type: {
    type: String,
    required: true,
  },
  tips: [
    { 
      title:{
        type:String
      },
      body:{
        type:String
      }
    },
  ],
}, {timestamps: true});

module.exports = mongoose.model("tips", plantTipsSchema);