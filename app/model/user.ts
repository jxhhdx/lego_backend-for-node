import { Application } from 'egg'
import { Schema } from 'mongoose'

export interface UserProps {
  username: string;
  password: string;
  email?: string;
  nickName?: string;
  age?: number;
  picture?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function initUserModel(app: Application) {
  const UserSchema = new Schema<UserProps>({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nickName: { type: String },
    age: { type: Number },
    picture: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
  }, { timestamps: true })
  return app.mongoose.model<UserProps>('User', UserSchema)
}
