import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  dateOfRegistration: { type: Date, default: Date.now },
  dob: { type: Date, required: true },
  monthlySalary: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  password: { type: String, required: true },
  purchasePower: { type: Number, default: 0 }
});

export default mongoose.model('User', UserSchema);
