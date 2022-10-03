//정리는 외부에서 받은거 맨위로 그다음 내부 순으로하기
const express = require('express');
const app = express();
const connect = require("./schemas/index"); //스키마 폴더에서 쓸꺼야
const indexRouter = require('./routes/index') 
const port = 3000;

connect();
app.use(express.json());

app.use(indexRouter);


app.listen(port,() =>{
    console.log('port 3000')
});