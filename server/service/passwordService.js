import bcrypt from 'bcrypt'
import md5 from 'md5'

const hashPassword = (password) => {
    return md5(password);
}

const comparePassword = (password, orignalPassword) => {
    const hashedPassword = hashPassword(password)
    return hashedPassword === orignalPassword
}

export { hashPassword, comparePassword }