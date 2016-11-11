const express = require('express');
const path = require('path');
const app = express();

//data api
const data = require('./songs.json');

app.get('/', function(req, res, next){
  res.json({
    id: "1",
    title: "你，好不好？",
    singers: "周興哲"
  })
})

app.get('/data.json', function(req, res, next) {
  res.json(data);
})

// use normalizr
const normalizr = require('normalizr');
const Schema = normalizr.Schema;
const arrayOf = normalizr.arrayOf;
const normalize = normalizr.normalize;
//define a schema for entities
const music = new Schema('musics', {idAttribute: '_id'});
const composer = new Schema('composers', {idAttribute: '_id'});
music.define({
  singer: composer,
  songs: arrayOf(composer)
})

const dataN = normalize(data, music);

app.get('/dataN.json', function(req, res, next) {
  res.json(dataN);
})

app.listen(3000, function(){
  console.log('server listening on port 3000...');
})
