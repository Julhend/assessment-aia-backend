const express = require("express");
const app = express.Router();
var axios = require("axios");
const qs = require("querystring");

app.get("/feeds-image", async (req, res) => {
  const baseRecent = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&`;
  const baseSearch = `https://www.flickr.com/services/rest/?method=flickr.photos.search&`;
  const { page,per_page, tags } = req.query;
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

let photo =[]
result.data.photos.photo.map((e)=>{
  const srcPath = 'https://farm' + e.farm + '.staticflickr.com/' + e.server + '/' + e.id + '_' + e.secret + '.jpg';
  const newData ={
    id:e.id,
    title:e.title,
    images: srcPath
  }
  photo.push(newData)
})

const data ={
  "photos":{
    "page": result.data.photos.page,
    "pages": result.data.photos.pages,
    "perpage": result.data.photos.perpage,
    "total": result.data.photos.total,
    "photo": photo
  }
}

console.log(data);

    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = app;
