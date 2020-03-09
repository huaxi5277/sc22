const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PublicSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:"users"
  },
  text:{
    type:String,
  },
  name:{
    type:String, 
  },
  avatar:{
    type:String, 
  },
  likes:[
    {
      user:{
        type:Schema.Types.ObjectId,
        ref:"users"
      }
    }
  ],
  img : {
    type:[String]
  },
  date:{
    type:Date,
    default:Date.now
  }
})

module.exports = Public = mongoose.model("public",PublicSchema);