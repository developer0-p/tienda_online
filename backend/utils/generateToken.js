import jwt from 'jsonwebtoken'

const generateToken = (res,userId) => {
     // create token
     const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      })
  
      // Set JWT as HTTP-only cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      })
}

export default generateToken