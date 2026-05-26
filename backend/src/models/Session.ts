import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  tokenHash: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {timestamps: true})

export default mongoose.model('Session', SessionSchema)