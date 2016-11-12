const { normalize, arrayOf, Schema } = require('normalizr');

//schemas
const postSchema = new Schema('posts');
const authorSchema = new Schema('author');
const commentSchema = new Schema('comment');

postSchema.define({
  author: authorSchema,
  comments: arrayOf(commentSchema)
})
commentSchema.define({
  author: authorSchema
})

module.exports = data => normalize(data, arrayOf(postSchema));
