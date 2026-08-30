const UserModel = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req,res){
    try{
        let {email,password} = req.body;
        let existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(409).json("User already exists")
        }
        const hashedPassword = bcrypt.hashSync(password,10);

        let newUser = await UserModel.create({
            email,
            password:hashedPassword
        })
        return res.status(201).json(newUser)


    }catch(err){
        return res.status(500).json("Error while registering user")
    }
}

async function login(req,res){
    try{
        let {email,password} = req.body;
        let existingUser = await UserModel.findOne({email})
        if(!existingUser){
            return res.status(409).json("User does not exists")
        }else{

            let validPassword = bcrypt.compareSync(password, existingUser.password);

            if(!validPassword){
                return res.status(404).json("Incorrect password")
            }
            const secretKey = pprocess.env.JWT_SECRET_KEY || "secretkey"
            const token = jwt.sign({id:existingUser._id.toString()},secretKey,
            { expiresIn: '2h' });

            return res.status(200).json({
                user:{
                    email: existingUser.email,
                },
                accesstoken: token
            })
        }
    }
    catch(err){
        return res.status(500).json("Error while login user")
    }
}

module.exports = {register,login}
