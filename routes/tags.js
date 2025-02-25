import express from 'express';
import fs from 'fs'
import crypto from 'crypto';

const router = express.Router()

function readTags() {
    const tagsData = fs.readFileSync("./data/tags.json");
    const parsedData = JSON.parse(tagsData);
    return parsedData;
}

// GET endpoint for tags
router.get('/tags', (req, res) => {
    const tags = readTags();
    res.json(tags);
  });

export default router;
