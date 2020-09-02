const router = require('express').Router();
//const cors =require("cors");
// const jwt = require("jsonwebtoken");
// const bycypt=require("bycrypt");
let Signup = require('../models/User');
var users=[
    {
        email:'has@gmail.com',password:'111'
    }
]

//process.env.SECRET_KEY="secret";

router.route('/').get((req,res)=>{
    Signup.find()
    .then(signup => res.json(signup))
    .catch(err=>res.status(400).json('Error: ' +err));
});

router.route('/add').post((req,res) =>{
    const name= req.body.name;
    const email= req.body.email;
    const password= req.body.password;
    const mobile= req.body.mobile;
    

    const newSignup= new Signup({
        name,
        email,
        password,
        mobile,
    });

    newSignup.save()
    .then(() => res.json('New user added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res)=>{
    Signup.findById(req.params.id)
    .then(signup => res.json(signup))
    .catch(err=>res.status(400).json('Error: ' +err));
});


// router.route('/login').post((req,res)=>
// Signup.findOne({
//   emailadress :req.body.emailadress  
// })
//   .then (signup=>{
//       if(signup){
//           if(bcrypt.compareSync(req.body.password,signup.password)){
//               const payload={
//                   _id:signup._id,
//                   firstname:signup.firstname,
//                   lastname:signup.lastname,
//                   gender:signup.lastname,
//                   emailadress:signup.emailadress,
//                   password:signup.params,
//                   contactno:signup.contactno,
//                   adress:signup.adress

//               }
//               let token =jwt.sign(payload,process.env.SECRET_KEY,{
//                   expiresIn:1440
//               }) 
//                   res.send(token)
//               }else{
//                   res.json({console:"User does not exist"})
//                   }
//               }else{
//                   res.json({error:"User does not exist"})
//               }

//              } )
//              .catch(err=>{
//                 res.send('error: '+ err)
//              })
//          )
router.route('/login').post((req,res)=>{
    let result=users.find(user=>user.emailadress==req.body.emailadress);
    if(result){
        if(result.password==req.body.password){
            res.status(200).send({
                message:"Successful Login!!"
            })
        }else{
                res.status(200).send({
                    message:"Password incorect!!"  
                })
            }
    }else{
        res.status(200).send({
            message:"User not found!!"
        })
    }

        
    
});
             
              
              
      
  
  


module.exports = router;