//next是指middleware完成后要执行的操作 
module.exports = (req, res, next) =>{
    if (!req.user){
        return res.status(401).send({error: 'You must login!'});
    }

    next();
}; 