
const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({ // 어떤 스키마에 넣을껀지 
  user: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  createdAt:{
    type: String
  }

  
});


module.exports = mongoose.model("posts", postsSchema); //호출시 스키마가 등록된다.