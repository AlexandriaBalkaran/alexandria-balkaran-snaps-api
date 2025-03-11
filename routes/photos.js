import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

function readPhotos() {
  const photosData = fs.readFileSync("./data/photos.json");
  const parsedData = JSON.parse(photosData);
  return parsedData;
}

function getPhotoById(id) {
  const photos = readPhotos();
  return photos.find((photo) => photo.id === id);
}

// GET endpoint for photos
router.get("/", (req, res) => {
  try {
    const photos = readPhotos();
    res.json(photos);
  } catch (error) {
    console.error("Error fetching photo:", error);
  }
});

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const photo = getPhotoById(id);

    if (photo) {
      res.status(200).json(photo);
    } else {
      res.status(404).json({ error: "Photo not found" });
    }
  } catch (error) {
    console.error("Error fetching photo by id", error);
  }
});

router
  .route("/:id/comments")
  .get((req, res) => {
    try {
      const id = req.params.id;
      const photo = getPhotoById(id);

      if (photo) {
        res.status(200).json(photo.comments);
      } else {
        res.status(404).json({ error: "Photo not found" });
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  })
  .post((req, res) => {
    try {
      const id = req.params.id;
      const { name, comment } = req.body;
      const photos = readPhotos();

      if (name.trim() === "" || comment.trim() === "") {
        return res.status(400).send(`Error: missing name or comment : ${name}, ${comment}`);
      }

      const photo = photos.find((photo) => photo.id === id);

      const newComment = {
        id: uuidv4(),
        name: name,
        comment: comment,
        timestamp: Date.now(),
      };

      if (photo) {
        photo.comments.push(newComment);
        fs.writeFileSync("./data/photos.json", JSON.stringify(photos));
        res.status(201).json(newComment);
      } else {
        res.status(404).json({ error: "Invalid name and comment" });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  });

export default router;
