import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput{
  username: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {

  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  username: {type: String, required: [true, "Username is required"], unique: [true, "This username is already taken"]},
  password: {type: String, required: [true, "Password is required"]}
},{
  timestamps: true
});

userSchema.pre("save", async function(next){
  let user = this as UserDocument;
  if(!user.isModified("password")){
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
})

userSchema.path("username").validate(async (username: string)=>{
  const usernameCount = await mongoose.models.User.countDocuments({username});
  return !usernameCount;
}, "This username is already taken");

userSchema.methods.comparePassword = async function(
  candidatePassword: string
  ): Promise<boolean>{
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((error: any) => false)
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;