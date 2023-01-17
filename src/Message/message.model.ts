import mongoose from "mongoose";
import { UserDocument } from "../User/user.model";

export interface MessageInput{
  user: UserDocument["_id"];
  username: String;
  msg: String;
  location: Number;
}

export interface MessageDocument extends MessageInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true},
  username: {type: String, required: true, unique: true},
  msg: {type: String, required: true},
  location: {type: Number, required: true, unique: true}
},{
  timestamps: true
});

messageSchema.path("username").validate(async (username: string) => {
  const usernameCount = await mongoose.models.Message.countDocuments({username});
  return !usernameCount;
}, "You have already posted a message");

const MessageModel = mongoose.model<MessageDocument>("Message", messageSchema);

export default MessageModel;