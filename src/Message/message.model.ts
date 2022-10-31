import mongoose from "mongoose";
import { UserDocument } from "../User/user.model";

export interface MessageInput{
  user: UserDocument["_id"];
  username: String;
  msg: String;
  color: String;
  location: Number;
}

export interface MessageDocument extends MessageInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  username: {type: String, required: true},
  msg: {type: String, required: true},
  color: {type: String, required: true},
  location: {type: Number, required: true, unique: true}
},{
  timestamps: true
});

const MessageModel = mongoose.model<MessageDocument>("Message", messageSchema);

export default MessageModel;