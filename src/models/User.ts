import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  movies: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});

export default mongoose.model<IUser>("User", userSchema);
