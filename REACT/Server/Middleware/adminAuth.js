function adminCheck(req,res,next){
    try{
       if(req.userType ==='admin'){
           next();
       }
       else{
           res.status(401).json({message:"Unauthorized access!"})
       }
    }
    catch(error){
       console.log(error)
       res.status(500).json({message:"Internal server error"})
    }
   }
   
   export default adminCheck;