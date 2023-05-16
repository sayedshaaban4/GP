const jwt = require('jsonwebtoken');

const token = async (req , res , next) => {
    try{
        // hanshoof ibrahim mesameh eh ?
        const token = req.header('authorization');
        if(!token){
            return res.status(401).json({msg : "Access Denied!"});
        }
        const check = jwt.verify(token , 'passwordkey');
        if(!check){
            return res.status(401).json({msg : "Access Denied!"});
        }
        req.user=check.id;
        req.token=token;
        next();
    }catch (e) {
        res.status(500).json({error:e});
    }
}

module.exports = token;