const express = require('express');
const router = express.Router();

const Post = require('../schemas/posts');




///몽구스의 스키마를 이용하여몽고 디비에 저장 하기
router.post('/', async (req, res) => {   //post누르면 정보가 담겨있음
    const { user, password, title, content, } = req.body; //저장해야할 정보를 받아와서 변수에 등록시킨다. req.body에 정보가 들어있음
    const createdAt = new Date(); //날짜 지정 yyyddmmm이거 쓰기 나중에 하자!!
    await Post.create({ user, password, title, content,createdAt}); //스키마.db에 정보를 만들어준다
    //스키마 Post 아이디로 정보를 저장하고 만들어줌
    res.send({'message': "게시글을 생성하였습니다."}); //메세지 생성
});

//몽고 디비에 받아오기
///async 비동기 함수를 정의 하는것, 암시적으로 Promise를 사용하여 결과를 반환합니다
//오래 걸리면 밑으로 진행함
//await Promise를 기다리기 위해 사용됩니다. 연산자는 async function 내부에서만 사용할 수 있습니다.

router.get('/',async (req,res)=>{// get으로 데이터를 불러올꺼임
   //포스트(스키마).정보를 찾아와서 posts변수에 넣어줌 이게 바로 받아온다 굳이 맵 안써두됨!!!!
  // console.log(posts) //내림차순 추가하기
  const posts = await Post.find().sort({ createdAt: "desc" }) ////내림차순 차을때 사용한다!!!!
  const post = posts.map((posts)=> {
      return {  ///필요값만 보여주기 위함
        postId : posts._id,
        user : posts.user,
        title : posts.title,
        createdAt :posts.createdAt
      }
  })

    res.json({data : post});//찾아온 정보를 data에 넣어서 보내준다    
  })

  //상세 페이지 조회
  router.get('/:_postId' ,async (req,res)=>{
    console.log(req.params)
    const { _postId } = req.params; //썬더에 입력하면 정보 받아옴
    const postOne = await Post.findOne({_id :_postId}); //Post.findOne({_id :_postId}), 아이디가 일치하는것을 찾아옴
   console.log(postOne)
    console.log({ _postId :postOne._id})
        res.json({ data: postOne})///필요값만 보여주기 위함
      })





// 게시글 수정하기 하기
router.put("/:_postId", async (req, res) => {
  const { _postId } = req.params; //아이디 정보를 받아옴 내가 put누르면 정보가 담겨있음
  const { password, title, content} = req.body; //바디에 내가 적으면 여기에 뜸 헷갈리면 찍어보자
  const posts = await Post.findOne({ _id: _postId }); //중복되면 한개만 쓰면됨 구조할당 분해 찾을수 있음//
  // console.log(_postId)
  if (posts.password == password) { // pw워드가 일치하면 정보수정할수있게 
    await Post.updateOne({ _id : _postId }, { $set: {password,title, content } });
  }else { //한개를 업데이트 한다 {$set{password,title, content  }}
      return res.status(400).json({ //else문 쓸때 예외처리하기
      success: false,
      msg: "비밀번호가 일치하지 않습니다!",
      });
      }
  // console.log(posts)
  res.json({data : posts})
  res.send({'message': "게시글을 수정하였습니다."})
})



//게시물 지우기 비밀번호 적어서 해야함
router.delete("/:_postId", async (req, res) => {
  const { _postId } = req.params; //아이디 정보를 받아온다 delete 누르면 작동함
  const { password } = req.body; //바디에 내가 적으면 여기에 뜸 정보수정할꺼
  // console.log(password)
  const posts = await Post.findOne({ _id : _postId }); //일치하는 포스트 아이디 값은
  console.log(posts.password ,password)
  if (posts.password == password) { //pw가 일치하면 통과함
  await Post.deleteOne({ _id : _postId }); //해당하는 아이디를 삭제해라
  }else { //한개를 삭제한다.
    return res.status(400).json({ //else문 쓸때 예외처리하기
    success: false,
    msg: "비밀번호가 일치하지 않습니다!",
    });
    }
  res.json({"message":"게시글을 삭제하였습니다."}); //
});











module.exports = router;