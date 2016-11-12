const { normalize, Schema, arrayOf } = require('normalizr');

// articles schema
// const articlesSchema = new Schema('articles');
const articleSchema = new Schema('article');
const userSchema = new Schema('user');

//definition

articleSchema.define({
  author: userSchema
})


module.exports = function flattenDataByArticles (data) {
  return normalize(data, arrayOf(articleSchema));
}
