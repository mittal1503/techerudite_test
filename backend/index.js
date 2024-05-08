const express = require('express');
const app = express();
const port = process.env.port || 5000

require('dotenv').config();
const cors = require('cors');
app.use(cors())
app.use(express.json());
const {registerUser,loginUser} =  require('./routing/user')
const {verifyEmail,check} = require('./routing/email')
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.post('/register',(req,res)=>{
    registerUser(req,res);
})

app.post('/login',(req,res)=>{
    loginUser(req,res);
})

app.get('/verify-email',(req,res)=>{
    console.log("inside app.get")
    verifyEmail(req,res);
})
app.listen(port,(req,res)=>{
    console.log("listening on port",port)
})