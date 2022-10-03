const express = require('express');
const Post = require('../schemas/posts');
const router = express.Router();


///몽구스의 스키마를 이용하여몽고 디비에 저장 하기
router.post("/posts", async (req, res) => {
    
    const { user, password, title, content, createAt} = req.body; //저장해야할 정보를 받아와서 변수에 등록시킨다. req.body에 정보가 들어있음
    await Post.create({ user, password, title, content,createAt}); //스키마.db에 정보를 만들어준다
    //스키마 Post 아이디로 정보를 저장하고 만들어줌
    res.send({'message': "게시글을 생성하였습니다."}); //메세지 생성
});
//몽고 디비에 받아오기
///async 비동기 함수를 정의 하는것, 암시적으로 Promise를 사용하여 결과를 반환합니다
//await Promise를 기다리기 위해 사용됩니다. 연산자는 async function 내부에서만 사용할 수 있습니다.
router.get('/posts',async (req,res)=>{// get으로 데이터를 불러올꺼임
  const posts = await Post.find(); //포스트(스키마).정보를 찾아와서 posts변수에 넣어줌
  const result = posts.map((post) => { return { //result 변수에 posts를 맵을 써서 정보를 받아서 result에 넣어준다 
    postId : post._id, //받아와야 하는 정보
    user : post.user, //받아와야함
    title : post.title,
    createdAt : post.createdAt
    }
  })
  // console.log(result)
    res.json({data : result});//찾아온 정보를 data에 넣어서 보내준다    
  })

  //상세 페이지 조회
  router.get('/posts/:_postId' ,async (req,res)=>{
    console.log(req.params)
    const { _postId } = req.params;
    const posts = await Post.find(); //포스트(스키마).정보를 찾아와서 posts변수에 넣어줌
    const results = posts.map((post) => { return { //result 변수에 posts를 맵을 써서 정보를 받아서 result에 넣어준다 
    postId : post._id, //받아와야 하는 정보
    user : post.user, //받아와야함
    title : post.title,
    content : post.content,
    createdAt : post.createdAt
    }
  })
 const result =results.filter((post)=> post.postId == _postId)
 //필터를 사용하여 _postId값과 같은 아이디만 반환해준다
 //filter((x)=> x == z)등 조건과 일치하면 반환해준다.
  res.json({data : result});
   //찾아온 정보를 data라는 리스트에 넣어서 보내준다    
});








module.exports = router;