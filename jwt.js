const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{
   
    // first check request header has authorization or not
    const authorization=req.headers.authorization
    if(!authorization)
    {
        return res.status(401).json({error:'invalid token'});
    }
    // extract the jwt token from the request header 
    const token =req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});
    try{
     //verify the Jwt token
      const decoded = jwt.verify(token,process.env.JWT_SECRET);//return payload
    // server pass
    // Attach user imformation to the request body
    // In the jwtAuthMiddleware function, req.user is a property that gets added to the req (request) 
    // object after successfully decoding the JWT (JSON Web Token).
    req.user=decoded;
    console.log(req);
    next();
    }catch(err){
        console.log(err);
        res.status(401).json({error:'Invalid token'});
    }
}
// function to generate JWT token

const genrateToken=(userData)=>{
    // generate a new  JWT token using user data
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000});
}

module.exports={jwtAuthMiddleware,genrateToken};