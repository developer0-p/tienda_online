import mongoose from 'mongoose'

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

const User = mongoose.model('Usuario', userSchema)

export default User
