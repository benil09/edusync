import mongoose from 'mongoose'

const schema = mongoose.Schema;

const messageSchema = new schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  text: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  seen: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Compound indexes for optimized conversation fetching
messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });
messageSchema.index({ receiverId: 1, senderId: 1, createdAt: -1 });

const Message = mongoose.model("Message", messageSchema);
export default Message;