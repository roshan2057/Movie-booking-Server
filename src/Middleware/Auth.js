import jwt from "jsonwebtoken"

export const auth =(req,res,next)=>{
    if(req.headers.token){
        jwt.verify(req.headers.token,process.env.jwt_key,(error,result)=>{
            if(error){    
                return res.status(401).send('Unauthorized token');
            }
            else{
                req.userID = jwt.decode(req.headers.token).id;
                next();
            }
        })
    }else{
        return res.status(401).send("No Token")
    }
}