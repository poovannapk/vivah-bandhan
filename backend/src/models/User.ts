import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  role?: string;
  dateOfBirth?: string;
  gender?: string;
  phone?: string;
  profileComplete?: boolean;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  role: { type: String, default: 'user' },
  dateOfBirth: { type: String },
  gender: { type: String },
  phone: { type: String },
  profileComplete: { type: Boolean, default: false },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;