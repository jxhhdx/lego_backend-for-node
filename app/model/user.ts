
import { Application } from 'egg'
import { Schema } from 'mongoose'

export default function initUserModel(app: Application) {
  const UserSchema = new Schema({
    name: { type: String },
    age: { type: Number },
    hobby: { type: Array },
    userid: { type: String },
    address: { type: String },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  }, { collection: 'user' });
  return app.mongoose.model('User', UserSchema);
}