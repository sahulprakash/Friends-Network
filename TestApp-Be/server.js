const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const registerRotes = require('./api/routes/register')
var profileRotes = require('./api/routes/user')
var cors = require('cors')

const port = 3000
const app =express();

app.use(cors()) 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/',profileRotes)
app.use('/',registerRotes)

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'))
});

app.listen(port,function(){
    console.log('listening at port 3000!!!')
    console.log(__dirname)
})