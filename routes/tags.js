import express from 'express';
import fs from 'fs'
import crypto from 'crypto';

function displayTags() {
    const tagsData = fs.readFileSync("./data/tags.json");
    const parsedData = JSON.parse(tagsData);
    return parsedData;
}
