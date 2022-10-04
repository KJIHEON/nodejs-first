const express = require('express');
const router = express.Router();

const comments = require('../schemas/comments');

//게시물 작성 
  router.post('/:_postId', async (req,res)=>{
    const { _postId } = req.params; //입력받은 아이디값이들어옴
    // console.log(_postId )
    const {user, password, content} = req.body; //저장해야할 정보를 받아와서 변수에 등록시킨다. req.body에 정보가 들어있음
    // console.log(_postId,user,password,content)
    const createdAt = new Date(); //날짜  넣어주기
    await comments.create({ _postId ,user , password, content, createdAt}); //스키마.db에 정보를 만들어준다
    //스키마 Post 아이디로 정보를 저장하고 만들어줌
    res.json({'message': "댓글을 생성하였습니다."}); //메세지 생성 제이슨 형식으로 응답해줌
  })
  
module.exports = router;