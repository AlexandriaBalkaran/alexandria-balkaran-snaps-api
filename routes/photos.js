import express from 'express';
import fs from 'fs'
import crypto from 'crypto';
// import { getPhotos , getPhotoById , getPhotoComments } from '../data/photos.js';

function displayPhotos() {
	const photosData = fs.readFileSync("./data/photos.json");
	const parsedData = JSON.parse(photosData);
	return parsedData;
}

// GET endpoint for all notes
router.get("/", getPhotos);
router.get("/photos/:id ", getPhotoById);
router.get("/photos/:id/comments", getPhotoComments);
