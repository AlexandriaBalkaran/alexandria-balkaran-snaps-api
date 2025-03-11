import express from "express";
import fs from "fs";

const router = express.Router();

function readTags() {
  const tagsData = fs.readFileSync("./data/tags.json");
  const parsedData = JSON.parse(tagsData);
  return parsedData;
}

// GET endpoint for tags
router.get("/", (req, res) => {
  try {
    const tags = readTags();
    res.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
  }
});

export default router;
