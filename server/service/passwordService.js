import bcrypt from 'bcrypt'

const hashPassword = async (password) => {
    const data = await bcrypt.hash(password, 10)
    return data
}

const comparePassword = async (password, orignalHashedPassword) => {
    const data = await bcrypt.compare(password, orignalHashedPassword)
    return data
}

export { hashPassword, comparePassword }