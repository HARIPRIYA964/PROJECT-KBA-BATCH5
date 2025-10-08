import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Login } from "../Models/Login.js";
import authenticate from '../Middleware/auth.js'



dotenv.config()

const loginRoute = Router()

loginRoute.post("/signup", async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newPassword = await bcrypt.hash(password, 10);
  
      const existingAdmin = await Login.findOne({ userType: "admin" });
      let userType = "user";
      if (!existingAdmin) {
        userType = "admin";
      }

      const result = await Login.findOne({ email });
      if (result) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = new Login({
        username,
        email,
        password: newPassword,
        userType,
      });
  
      await user.save();
      res.status(200).json({ message: "Signup successful" });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Signup failed" });
    }
  });

loginRoute.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body;
        const result = await Login.findOne({email:email});
        console.log(result)
        if(!result){
            return res.status(400).json({message:"User does not exist"});
            }
            else{
                const ismatch = await bcrypt.compare(password,result.password);
                
                if(ismatch){   
                    const token = jwt.sign({_id: result._id,email:email,userType:result.userType},process.env.SECRET_KEY,{expiresIn:'7d'})
                   
                    res.cookie('Token',token,{
                        httpOnly:true,
                    })
                    res.status(200).json({message:"User Login successfully",userType: result.userType,email: result.email});
                    console.log(token);   
                    return(result)     
                    
                    
                    }
                    else{
                        return res.status(400).json({message:"Invalid Password"});
                        }   
                        }
                        } catch (error) {
                            res.status(500).json({message:"Internal Server Error"});
                            console.log(error)
                            }

})

loginRoute.post('/logout',(req,res) => {
    const cookieOpts = {
    httpOnly: true,
    sameSite: 'lax',                               // match your login
    secure: process.env.NODE_ENV === 'production',
    path: '/',                                     // match path
    // domain: '.yourdomain.com',                  // include if you set it at login
  };

  res.clearCookie('Token', cookieOpts);
  res.cookie('Token', '', { ...cookieOpts, expires: new Date(0) });
  res.set('Cache-Control', 'no-store, private');
  res.status(200).json({ msg: 'Successfully logged out' });
});


loginRoute.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await Login.findOne({ email: req.email });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
  }
    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export {loginRoute}

