const express = require('express');
const router = express.Router();

const comments = require('../schemas/comments');


  router.post('/comments/:_postid', async (req,res)=>{
    const { _postId } = req.params;
    const { pw, password, content} = req.body; //저장해야할 정보를 받아와서 변수에 등록시킨다. req.body에 정보가 들어있음
    const createdAt = new Date();
    await comments.create({ _postId ,user , pw, password, content, createdAt}); //스키마.db에 정보를 만들어준다
    //스키마 Post 아이디로 정보를 저장하고 만들어줌

    const c=a
    res.send({'message': "댓글을 생성하였습니다."}); //메세지 생성
  })
  
module.exports = router;