import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      // email is unique
      type: String,
      required: true,
      unique: true,
    },
    password: {
      // password is hashed
      type: String,
      required: true,
    },
    isAdmin: {
      // isAdmin is a boolean
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  // compare enteredPassword with user.password
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('Usuario', userSchema)

export default User
