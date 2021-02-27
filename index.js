const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var User = require('./models/user');
var Shop = require('./models/shop');
//========= bcrypt data=============
const bcrypt = require('bcrypt');
const saltRounds = 10;
//==================================
var jwt = require('jsonwebtoken');
const { use } = require('passport');
require("dotenv").config();
const {JWT_SECRET} = require("./config/keys"); 
const PORT = process.env.PORT || 1337;
const app = express();
const {MONGOURI} = require("./config/keys");

app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log('Connected to DB1!'))
.catch(error => console.log(error.message));




if(process.env.NODE_ENV !== 'production')
{
    app.use(cors());
}


app.get('/', (req, res)=>{
    res.send('hi');
});

app.post('/api/signup', async(req, res)=>{
    
   // console.log(req.body);

    const user = await User.findOne({email: req.body.email});

    if(user)
    {
        return res.json({status:'err', message:'User with this email already exists'});
    }

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
           // add user to Db using hashed password 
            User.create({
                displayName: req.body.displayName,
                email: req.body.email,
                password: hash
        
            },(err, newlyCreated)=>{
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log('success new user');
                }
            });
        });
    });

    res.json({staus : 'ok'});   

})

app.post('/api/signin', async(req, res)=>{
    
    const{email, password}= req.body;

    const user = await User.findOne({email: email});

    if(!user)
    {
      return res.json({message: 'User not found'});
    }
    
    bcrypt.compare(password, user.password, function(err, result) {
        if(!err)
        {
            if(result)
            {
                var token = jwt.sign({ 
                    id: user._id, 
                     }, JWT_SECRET);

                   // console.log(token);
                
                return res.json({status:'ok', token, user:{
                    id: user._id,
                    displayName: user.displayName,
                    email: user.email
                    
                }});
            }
            else
            return res.json({staus : 'err', message: 'Incorrect Password'});

        }
        else{
            return res.json({staus : 'err', message: 'Something went wrong!'});
        }

    });

   
   // console.log(user);

})

app.get('/api/shop', function(req, res) {
    Shop.find({}, { _id: 0 },(err, ans)=>{
        res.send(ans[0]);
       // console.log(ans[0]);
    })
  });


  if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
  }


app.listen(PORT,()=>{console.log("Listening");});
