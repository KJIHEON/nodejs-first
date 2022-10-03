const express = require('express');
const comment = require('../schemas/comments');
const router = express.Router();


router.post('/comments', (req, res) => {
    res.send('H12332코멘트rld!');
  });
  
module.exports = router;