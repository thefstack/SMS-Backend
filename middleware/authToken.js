const jwt = require('jsonwebtoken');
const User=require("../models/userModel")
const cookieParser = require('cookie-parser');

const authenticateToken = async(req, res, next) => {
    const token=await req.cookies.token;
    if (!token) return res.status(401).json({ error: 401 });

    await jwt.verify(token, process.env.SECRET_KEY, async(err, user) => {
        if (err){ 
            return res.status(401).json({ error: "Unauthorised" });}

            try {
                const validUser = await User.findOne({username:user.username,token:token});

            if (!validUser) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
    
                req.user = user;
                next();

            } catch (error) {
                return res.status(500).json({ error: 'Database error' });
            }
    });
};

const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Not Authorized' });
    }
    next();
};

module.exports = {authenticateToken,authorizeAdmin};
