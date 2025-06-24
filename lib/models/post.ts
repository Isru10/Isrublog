import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    title: String,
    content: String,
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // This creates a reference to the User model
      required: true,
    },
    authorName: { // We'll store the name for easy display
      type: String, 
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export default Post;