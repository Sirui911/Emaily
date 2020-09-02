module.exports = (req, res, next) =>{
    if (!req.user.credtis < 1){
        return res.status(403).send({error: 'Not Enough Credits!'});
    }

    next();
}; 