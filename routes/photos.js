import express from 'express';
import fs from 'fs'
import crypto from 'crypto';
import { timeStamp } from 'console';
import { v4 as uuidv4 } from "uuid";

const router = express.Router()

function readPhotos() {
	const photosData = fs.readFileSync("./data/photos.json");
	const parsedData = JSON.parse(photosData);
	return parsedData;
}

function getPhotoById (id) {
	const photos = readPhotos();
	return photos.find((photo) => photo.id === id);
}


// GET endpoint for photos
router.get('/photos', (req, res) => {
	const photos = readPhotos();
	res.json(photos);
  });

// router.get("/photos/:id" , (req, res) => {
// 	const id = req.params.id;
// 	const photo = getPhotoById(id);
// 	res.json(photo);
// });
router.get("/photos/:id", (req, res) => {
    const id = req.params.id;
    const photo = getPhotoById(id);
    
    if (photo) {
        res.status(200).json(photo);
    } else {
        res.status(404).json({ error: "Photo not found" });
    }
});

// router.get("/photos/:id/comments" , (req, res) => {
// 	const id = req.params.id;
// 	const photo = getPhotoById(id);
// 	res.json(photo.comments);
// });
router.get("/photos/:id/comments", (req, res) => {
    const id = req.params.id;
    const photo = getPhotoById(id);
    
    if (photo) {
        res.status(200).json(photo.comments);
    } else {
        res.status(404).json({ error: "Photo not found" });
    }
});

router.post("/photos/:id/comments", (req, res) => {
	const id = req.params.id;
	const { name, comment } = req.body;
	const photo = getPhotoById(id);
	
	// const trimName = name.trim();
    // const trimComment = comment.trim();

	// if (name.trim() === "" || comment.trim() === "") {
	// 	return;

	// if (!name || !comment) {
    //     return res
    //         .status(400)
	// .send(`Error: missing name or comment : ${name}, ${comment}`)
	
	// if (!trimName || !trimComment || typeof name !== 'string' || typeof comment !== 'string') {
    //     return res.status(400).json({ error: "Invalid input. Please enter a valid name and comment." });
    // }


	const newComment = {
	  id: uuidv4(),
	  name: name,
	  comment: comment,
	  timestamp: Date.now(),
	};
	photo.comments.push(newComment);
	res.json(newComment);

	fs.writeFileSync("./data/photos.json", JSON.stringify(photos.comment));

	res.status(201).json(newComment);
});

export default router;
