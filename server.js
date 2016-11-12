const express = require('express');
const app = express();

//Schemas
const flattenDataByArticles = require('./schemas/articles');
const flattenDataByPosts = require('./schemas/posts');

//json data
const articles = require('./mockdata/articles.json');
const posts = require('./mockdata/posts.json');

//entry points
app.get('/', function(req, res, next){
  var resultHTML = '<h1>Welcome to the index page.<h1>';
  resultHTML += '<p>For testing the api, please add your entry points on the server.js file.</p>';

  res.send(resultHTML);
})

//articles
app.get('/articles', (req, res, next) => {
  res.json(articles)
})

app.get('/n/articles', (req, res, next) => {
  res.json(flattenDataByArticles(articles))
})

//posts
app.get('/posts', (req, res, next) => {
  res.json(posts);
})

app.get('/n/posts', (req, res) => {
  res.json(flattenDataByPosts(posts));
})


app.listen(3000, function(){
  console.log('server listening on port 3000...');
})
