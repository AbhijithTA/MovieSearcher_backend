import { Router } from "express";
import axios from "axios";
import User from "../models/User.js";
import Movie from "../models/Movie.js";
import { auth, type AuthRequest } from "../middleware/auth.js";

const router = Router();

// search endpoint
router.get("/search", auth, async (req: AuthRequest, res) => {
  try {
    const { title } = req.query;
    const apiKey = process.env.OMDB_API_KEY ;
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`);
    if (response.data.Search) {
      const filtered = response.data.Search.map((m: any) => ({
        title: m.Title,
        year: m.Year,
        poster: m.Poster,
        imdbID: m.imdbID
      }));
      res.json(filtered);
    } else {
      res.json([]);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// saving endpoint for movie
router.post("/save", auth, async (req: AuthRequest, res) => {
  try {
    const { title, year, poster, imdbID } = req.body;
    const movie = new Movie({ title, year, poster, imdbID });
    await movie.save();

    const user = await User.findById(req.user?.id);
    if (user) {
      user.movies.push(movie._id as import("mongoose").Types.ObjectId);
      await user.save();
    }
    res.json({ message: "Movie saved" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// get list api for movie
router.get("/list", auth, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.user?.id).populate("movies");
    res.json(user?.movies || []);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Delete api movie
router.delete("/:id", auth, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.movies = user.movies.filter(m => m.toString() !== req.params.id);
    await user.save();
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
