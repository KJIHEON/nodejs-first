const express = require('express');
const app = express();
const port = 3000;
const postsRouter = require('./routes/posts')
const commentsRouter = require('./routes/comments')
const connect = require("./schemas"); //스키마 폴더에서 쓸꺼야


connect();


app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.use(express.json());

app.use([postsRouter]);
app.use([commentsRouter]);

app.listen(port,() =>{
    console.log('port 3000')
});