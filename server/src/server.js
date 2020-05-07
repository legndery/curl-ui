const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const shellJs = require('shelljs');
app.use(bodyParser.json())

app.get('/', (req, res)=>{
  res.sendfile(path.resolve(__dirname, '../../dist/index.html'));
});
app.post('/curl', (req, res)=>{
  const {body} = req;
  const {stdout, stderr, code } = shellJs.exec(body.code, {silent: true})
  let result = ""
  if(!code){
    result = stdout;
  }else{
    result = stderr
  }
  res.send(result);
})
app.use('/', express.static(path.resolve(__dirname, '../../dist/')))


app.listen(8080, ()=>{
  console.log("Server started");
})