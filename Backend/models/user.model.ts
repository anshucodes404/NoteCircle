import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  friends?: mongoose.Types.ObjectId[];
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
}

const userSchema: Schema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    firstName: { type: String, required: true },
    lastName: { type: String },
    friends: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    refreshToken: {type: String, default: ""}
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
  const secret = process.env.ACCESS_TOKEN_SECRET as Secret;
  const expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"] || "1d";
  if (!secret) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }


  const payload = {
    _id: this._id,
    username: this.username,
    email: this.email,
  };


  const options: SignOptions = {
    expiresIn: expiresIn,
  }

  return jwt.sign(payload, secret as Secret, options);
};

export const User = mongoose.model<IUser>("User", userSchema);
