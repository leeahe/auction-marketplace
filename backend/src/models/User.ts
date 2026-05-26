import mongoose from 'mongoose'

// export interface User {
//   userId: string;
//   userName: string;
//   email: string;
//   hashedPassword: string;
//   address: string;
// }

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },  
  
  hashedPassword: {
    type: String,
    required: true
  }
}, {timestamps: true})

export default mongoose.model('User', UserSchema)