const router = require('express').Router();
const User = require('../models/Users');
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerValidation,loginValidation } = require('../validation');
const { route } = require('./listings');


// Validate Input



router.post('/register',async (req,res)=>{

    //Validate data 
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    //check if user exist
    const emailExist = await User.findOne({email: req.body.email}).catch()
    if(emailExist) return res.status(400).send('user email already exist')

    //hash password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    
    const user = new User({
         name : req.body.name,
         email : req.body.email,
         password : hashedPassword,
         phone : req.body.phone,
         address : req.body.address,
         img_src : req.body.name,
         userType : req.body.userType

     })
try{
    const savedUser = await user.save()
    res.status(200).send('doners')
}catch(err){
    res.status(400).send(err)
}

})

router.post('/login', async (req,res) => {
    
    //Validate data 
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    //check if user exist
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('invalid password or email')
    //check password
    const validPass= await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send('invalid password or email')

    //Create and assign a token 
    const token = jwt.sign({_id:user._id, email:user.email,picture:user.img_src},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token)
   
} )
router.get('/',async (req,res) => {
    try{
        const users = await User.find()
        res.json(users)
        console.table(users)
    }catch(err){
res.json(err)
    }
})

module.exports = router