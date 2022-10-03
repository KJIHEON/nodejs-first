const express = require('express');
const router = express.Router();

const Post = require('../schemas/posts');




///몽구스의 스키마를 이용하여몽고 디비에 저장 하기
router.post('/', async (req, res) => {  
    const { user, password, title, content, } = req.body; //저장해야할 정보를 받아와서 변수에 등록시킨다. req.body에 정보가 들어있음
    const createdAt = new Date(); //날짜 지정 yyyddmmm이거 쓰기 나중에 하자!!
    await Post.create({ user, password, title, content,createdAt}); //스키마.db에 정보를 만들어준다
    //스키마 Post 아이디로 정보를 저장하고 만들어줌
    res.send({'message': "게시글을 생성하였습니다."}); //메세지 생성
});

//몽고 디비에 받아오기
///async 비동기 함수를 정의 하는것, 암시적으로 Promise를 사용하여 결과를 반환합니다
//await Promise를 기다리기 위해 사용됩니다. 연산자는 async function 내부에서만 사용할 수 있습니다.
router.get('/',async (req,res)=>{// get으로 데이터를 불러올꺼임
  const posts = await Post.find(); //포스트(스키마).정보를 찾아와서 posts변수에 넣어줌 이게 바로 받아온다 굳이 맵 안써두됨!!!!
  console.log(posts) //내림차순 추가하기
  // const result = posts.map((post) => { return { //result 변수에 posts를 맵을 써서 정보를 받아서 result에 넣어준다 
  //   postId : post._id, //받아와야 하는 정보
  //   user : post.user, //받아와야함
  //   title : post.title,
  //   createdAt : post.createdAt
  //   }
  // })
  //  result.reverse() //최근에 쓴 순서대로 나오게함 
    res.json({data : posts});//찾아온 정보를 data에 넣어서 보내준다    
  })

  //상세 페이지 조회
  router.get('/:_postId' ,async (req,res)=>{
    console.log(req.params)
    const { _postId } = req.params; //썬더에 입력하면 정보 받아옴
    const posts = await Post.findOne({_id :_postId}); //포스트(스키마).정보를 찾아와서 posts변수에 넣어줌
    //콘솔 찍어보기
//     const results = posts.map((post) => { return { //result 변수에 posts를 맵을 써서 정보를 받아서 result에 넣어준다 
//     postId : post._id, //받아와야 하는 정보
//     user : post.user, //받아와야함
//     title : post.title,
//     content : post.content,
//     createdAt : post.createdAt
//     }
//   })
//  const result = results.filter((post)=> post.postId == _postId)
 res.json({data : posts});
 //필터를 사용하여 _postId값과 같은 아이디만 반환해준다
  //필터 사용 했는데 한개만 못찾아오나??
 //filter((x)=> x == z)등 조건과 일치하면 반환해준다.
   //찾아온 정보를 data라는 리스트에 넣어서 보내준다    
});


// 게시글 수정하기 하기
router.put("/:_postId", async (req, res) => {
  const { _postId } = req.params; //아이디 정보를 받아옴
  const { password, title, content} = req.body; //바디에 내가 적으면 여기에 뜸
  console.log(_postId, password,title,content)
  const posts = await Post.findOne({ _id: _postId }); //중복되면 한개만 쓰면됨 구조할당 분해 찾을수 있음//
  if (posts.password == password) {
    await Post.updateOne({ _id : _postId }, { $set: {password,title, content } });
  }else { //예외처리 하기
      return res.status(400).json({
      success: false,
      msg: "비밀번호가 일치하지 않습니다!",
      });
      }
  
  console.log(posts)
  es.json({data : posts})
  res.send({'message': "게시글을 수정하였습니다."})
})



// 게시물 지우기 비밀번호 적어서 해야함
// router.delete("/posts/:_postId", async (req, res) => {
//   const { _postsId } = req.params; //아이디 정보를 받아온다

//   const postboard = await Post.find({ _postsId });
//   if (postboard.password == password) {
//     await Post.deleteOne({ _postsId });
//   }
//   res.json({ result: "success" });
// });











module.exports = router;