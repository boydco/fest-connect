'use strict'

// const ig = require('instagram-node').instagram();
// const Instagram = require('instagram-node-lib')
require('dotenv').load()
// const Flickr = require("node-flickr")
// const FlickrApi = require("flickrapi"),

const R = require('ramda')
const Flickr = require("node-flickr");


// ***************************USING NODE-FLICKR LIB************************************************


var keys = {"api_key": process.env.FLICKR_KEY}
const flickr = new Flickr(keys);

var photoIds

var paramsWellington = {
  "lat":"-41.2889",
  "lon":"174.7772",
  "accuracy":11,
  "tags":"wellington" && "new zealand",
  "page":1,
  "per_page": 20,
  "min_taken_date":1420070400}

  var paramsMelbourne = {"lat":"-37.815018",
  "lon":"144.946014",
  "tags":"melbourne" && "australia",
  "page":1,
  "per_page": 20,
  "min_taken_date":1420070400}

  const getWellingtonPhotos = flickr.get("photos.search", paramsWellington, function(err, result){
   if (err) return console.error(err)
     //console.log(result.photos);
 });

  //refactor photoIds to use one function for either city
  const getMelbournePhotos = flickr.get("photos.search", paramsMelbourne, function(err, result){
   if (err) return console.error(err)
    photoIds = result.photos.photo.map ( (photo) => {
      return photo.id
    })
    photoIds.forEach(getPhotoInfo)
   //console.log(photoIds)
 });

// this passes in photoID information of each element of photoIds object, then it loads contentURL which takes the URL of each individual photoId.
  const getPhotoInfo = ( photoId ) => {
    flickr.get ("photos.getInfo", {photo_id: photoId}, function(err, result){
      if (err) return console.error(err)
      let contentUrl = (result.photo.urls.url)
      console.log(contentUrl)
    })
  }

//1. extract just URL
//2. something else then

  // const getPhotoUrl = () => {
  //   let contentUrl = getPhotoInfo()
  //   console.log(contentUrl)
  // }


// flickr.get("photos.search", {"lat":"-41.2889", "lon":"174.7772", "tags":"wellington"}, function(err, result){
//     if (err) return console.error(err);
//     console.log(result.photos);
// });

// flickr.get("photos.search", {"tags":"music","user_id":123456}, function(err, result){
//     if (err) return console.error(err);
//     //console.log(result.photos);
// });



// **************************END OF NODE-FLICKR****************************************************





// ***************************USING flickrapi******************************************************

// FlickrApi.tokenOnly(flickrOptions, function(error, flickr) {
//   // we can now use "flickr" as our API object,
//   // but we can only call public methods and access public data
// })

// ***************************END of flickrapi*****************************************************




