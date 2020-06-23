const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const cors = require('cors')

const base_dir = path.join(__dirname + '/views')
let app = express()

app.use(cors())
app.use(session({
      secret: 'keyboard cat'
}))

app.use(express.static('public'))

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.get('/',(req,res)=>{

    if(req.session.name){
        // res.send('hello world')
        console.log(req.session)
    }else{
        
    }
    res.sendFile(base_dir+'/index.html')
})

app.post('/chat',(req,res)=>{
    if(req.body.name){
        req.session.name = req.body.name
    }
    if(!req.session.name){
        res.redirect('/')
    }else{
        res.redirect('/chat')
    }
})

app.get('/chat',(req,res)=>{
    if(!req.session.name){
        res.redirect('/')
    }else{
        res.sendFile(base_dir+'/chat.html')
    }
})

app.post('/user/name',(req,res)=>{
    if(req.session.name){
        res.send({name:req.session.name})
    }else{
        res.status(400).send('Error')
    }
})

app.listen(3000)