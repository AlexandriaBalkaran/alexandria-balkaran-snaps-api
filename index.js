import express from "express";
import cors from "cors";
import "dotenv/config";
const app = express();
import photos from './data/photos.json';
import tags from './data/tags.json';
// which one below do I use?
const PORT = 8080;
// const port = process.env.PORT || process.argv[2] || 8080;
const { CORS_ORIGIN } = process.env;
app.use(cors({ origin: CORS_ORIGIN }));


app.use(express.json());

app.get('/photos', (req, res) => {
    res.json(photos);
  });
  
  app.get('/tags', (req, res) => {
    res.json(tags);
  });



app.listen(port, () => console.log(`Listening on ${port}`));