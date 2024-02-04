const jwt = require('jsonwebtoken')
const SECRET_VALUE = process.env.ACCESS_TOKEN_SECRET_VALUE

const generateJwt = (payload, expIn = "24h") => {
    const token = jwt.sign(payload, SECRET_VALUE, { expiresIn: expIn })
    return token
}

const decodeJwt = (token) => {
    const decoded = jwt.verify(token, SECRET_VALUE)
    return decoded
}

module.exports = { generateJwt, decodeJwt }