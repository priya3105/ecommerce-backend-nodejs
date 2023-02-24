const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
module.exports.signup = (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    confirmpassword,
    phone,
    gender,
    role,
    avatar,
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !role ||
    !password ||
    !confirmpassword ||
    !phone ||
    !gender
  ) {
    res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({email})
  .then(user=>{
      if(user) return res.status(401).json({msg:"user already exist"});
      const newUser=new User({firstname,lastname,phone,password,confirmpassword,role,email,gender});
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    jwt.sign(
                        { id: user._id },
                        config.get('jwtsecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                });
        })
    })
  })
};
module.exports.signin=async(req,res)=>{
  const{email,password}=req.body;
  if(!email || !password){
    return res.status(400).json({msg:"all fields are required"})
  }
  User.findOne({email})
  .then(user=>{
  if(!user) {
    return res.status(400).json({msg:"user not found"});
  }
   bcrypt.compare(password, user.password)
  .then(isMatch => {
      if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});

      jwt.sign(
          { id: user._id },
          config.get('jwtsecret'),
          { expiresIn: 3600 },
          (err, token) => {
              if(err) throw err;
              res.json({
                  token,
                  user: {
                      id: user._id,
                      name: user.name,
                      email: user.email
                  }
              });
          }
      )
  })
  })

}
module.exports.get_user=(req,res)=>{
  User.findById(req.user).select("-password").then(user=>res.json(user));

}
