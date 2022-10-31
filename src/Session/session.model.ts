import mongoose from "mongoose";
import { UserDocument } from "../User/user.model";

export interface SessionInput{
  user: UserDocument["_id"];
  valid: boolean;
}

export interface SessionDocument extends SessionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const sessionSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  valid: {type: Boolean, default: true}
},{
  timestamps: true
});


const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);

export default SessionModel;