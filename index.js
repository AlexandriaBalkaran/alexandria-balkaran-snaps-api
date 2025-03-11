import express from "express";
import cors from "cors";
import "dotenv/config";
const app = express();
import { v4 as uuidv4 } from "uuid";
import tags from "./routes/tags.js";
import photos from "./routes/photos.js";
const port = process.env.PORT || process.argv[2] || 8080;
const { CORS_ORIGIN } = process.env;
app.use(cors({ origin: CORS_ORIGIN }));
app.use(cors());

app.use(express.json());

app.use("/images", express.static("public/images"));

// GET endpoint for all tags
app.use("/tags", tags);

// GET endpoint for all photos
app.use('/photos', photos)

app.listen(port, () => console.log(`Listening on ${port}`));
