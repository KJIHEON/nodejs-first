const mongoose = require("mongoose");

///스키마 이름을 적어서 스키마를 저장할 타입을 정함
const commentsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true, //정보를 확인 하고 할것이냐
    unique: true // 하나만 가질수 있게 할꺼냐
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String
  },
  
});

//밖에서도 쓸수 있게함 모듈을 이용
module.exports = mongoose.model("comments", commentsSchema);