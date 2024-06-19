import jwt from "jsonwebtoken"
import createError from 'http-errors'

const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            aud:userId
        }
        const secret = process.env.ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: '7d'
        }
    
        jwt.sign(payload, secret, options, (err, token) => {
            if(err){
                console.log(err.message);
                reject(createError.InternalServerError())
            }
            resolve(token)
        })
    })
}

const verifyAccessToken = (req, res, next) => {
    if(!req.headers['authorization']) return next('Unauthorized')
    
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if(err)
        {
            const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
            return next(message)
        }
        req.payload = payload;
        next()
    })
}


export {signAccessToken, verifyAccessToken}