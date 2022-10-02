const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.send('Hello포스트 World!');
  });

const posts = require("../schemas/posts");
router.post("/posts", async (req, res) => {
    res.send('Hello sdafsdforld!');
    const { user, password, title, content} = req.body;
    const createdposts = await posts.create({ user, password, title, content});
    
      res.json({ posts: createdposts });
    console.log(req.body.password)
});

module.exports = router;