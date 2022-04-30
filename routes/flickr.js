const express = require("express");
const app = express.Router();
var axios = require("axios");
const qs = require("querystring");

app.get("/feeds", async (req, res) => {
  const baseRecent = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&`;
  const baseSearch = `https://www.flickr.com/services/rest/?method=flickr.photos.search&`;
  const { page, tags } = req.query;
  const api_key = `4ef5475c8e91c9452a786f1160e025a4`;
  const format = `json`;
  const nojsoncallback = `1`;
  const query = qs.stringify({ api_key, ...req.query, format, nojsoncallback });
  let result;
  try {
    if (page && tags) {
      result = await axios.get(`${baseSearch}${query}`);
    } else if (tags) {
      result = await axios.get(`${baseSearch}${query}`);
    } else if (page) {
      result = await axios.get(`${baseRecent}${query}`);
    } else {
      result = await axios.get(`${baseRecent}${query}`);
    }
    let data = result.data;
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = app;
