import mongoose, { Document } from "mongoose";

export interface IMovie extends Document {
  title: string;
  year: string;
  poster: string;
  imdbID: string;
}

const movieSchema = new mongoose.Schema<IMovie>({
  title: String,
  year: String,
  poster: String,
  imdbID: String
});

export default mongoose.model<IMovie>("Movie", movieSchema);
