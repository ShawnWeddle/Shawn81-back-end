import mongoose from "mongoose";

export interface BugInput{
  msg: String;
}

export interface BugDocument extends BugInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const bugSchema = new mongoose.Schema({
  msg: {type: String, required: true},
},{
  timestamps: true
});

const BugModel = mongoose.model<BugDocument>("Bug", bugSchema);

export default BugModel;