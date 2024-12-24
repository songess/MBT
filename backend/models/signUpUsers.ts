import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

interface SignUpUser {
  id: string;
}

const SignUpUserSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
  },
  { versionKey: false }
);

SignUpUserSchema.plugin(mongooseUniqueValidator);

export default mongoose.model<SignUpUser>('SignUpUser', SignUpUserSchema);
