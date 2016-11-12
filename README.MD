# Normalizr Example
Different JSON data:

1. __articles.json__ (Official tutorial)
2. __posts.json__ (More complicated example)

Use __``express.js``__ as backend server to respond json data object. Use [__``normalizr``__](https://github.com/paularmstrong/normalizr) to make them flat.

To kick off, install node packages by __npm__:
```
npm i
```
To fire up server, use __nodemon__:
```
npm start
```

By adding custom json file and entry point, you can see the response data magically to be flat through the customized schemas. [__normalizr__](https://github.com/paularmstrong/normalizr) are quite suitable for deeply structured json. It's very convenient to pull out the goal data.

## Example: the complicated posts json
The posts.json file structure looks like this:

```json
[{
    "id": 1,
    "title": "Blog Title",
    "content": "Some really short blog content.  Actually the least interesting post ever",
    "created_at": "2016-01-10T23:07:43.248Z",
    "updated_at": "2016 - 01 - 10 T23: 07: 43.248 Z ",
    "author": {
        "id": 81,
        "name": "Mr Shelby"
    },
    "comments": [{
        "id": 352,
        "content": "First!",
        "author": {
            "id": 41,
            "name": "Foo Bar"
        }
    }]
}, {
    "id": 2,
    "title": "Another Blog Title...",
    "content": "Another blog contents that doesn't really matter at all",
    "created_at": "2016-11-11T01:17:00",
    "updated_at": "2016 - 12 - 10 T23: 07: 43.248 Z ",
    "author": {
        "id": 45,
        "name": "Mr Jay"
    },
    "comments": [{
        "id": 41,
        "content": "Another!",
        "author": {
            "id": 46,
            "name": "Faye Lin"
        }
    }, {
        "id": 78,
        "content": "The Third!",
        "author": {
            "id": 87,
            "name": "Linsanity"
        }
    }]
}]
```

Obviously, you can see some patterns are duplicated, like authors and comments, though they are strictly not the same.

Because authors are everywhere inside the comments and posts, the json format is totally __deeply structured__. It's straightforward but quite hard to process.

By defining the schemas (the repeated patterns you find), you can pull them out:

```javascript
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
```

All of the above schemas will be pulled out and become the object keys under the __entities__, and the __result__ key indicates the ids of the posts. Wait...why posts? Because the __posts__ are the main point you are supposed to focus on, it's what you want to handle with.

At last but not least, apply all of the schemas through normalizing:

```javascript
module.exports = data => normalize(data, arrayOf(postSchema));

```

__arrayOf__ is meant to the data wrapped in an array. Thus. the json data would be formatted as follows:

```json
{
  "entities": {
    "posts": {
      "1": {
        "id": 1,
        "title": "Blog Title",
        "content": "Some really short blog content.  Actually the least interesting post ever",
        "created_at": "2016-01-10T23:07:43.248Z",
        "updated_at": "2016 - 01 - 10 T23: 07: 43.248 Z ",
        "author": 81,
        "comments": [
          352
        ]
      },
      "2": {
        "id": 2,
        "title": "Another Blog Title...",
        "content": "Another blog contents that doesn't really matter at all",
        "created_at": "2016-11-11T01:17:00",
        "updated_at": "2016 - 12 - 10 T23: 07: 43.248 Z ",
        "author": 45,
        "comments": [
          41,
          78
        ]
      }
    },
    "author": {
      "41": {
        "id": 41,
        "name": "Foo Bar"
      },
      "45": {
        "id": 45,
        "name": "Mr Jay"
      },
      "46": {
        "id": 46,
        "name": "Faye Lin"
      },
      "81": {
        "id": 81,
        "name": "Mr Shelby"
      },
      "87": {
        "id": 87,
        "name": "Linsanity"
      }
    },
    "comment": {
      "41": {
        "id": 41,
        "content": "Another!",
        "author": 46
      },
      "78": {
        "id": 78,
        "content": "The Third!",
        "author": 87
      },
      "352": {
        "id": 352,
        "content": "First!",
        "author": 41
      }
    }
  },
  "result": [
    1,
    2
  ]
}
```

Bob's your uncle! [__normalizr__](https://github.com/paularmstrong/normalizr) magically flatten the deeply structured json file. You can easily process the data afterwards, and it's fantastic.

---
Then you go! Feel free to append your fake data in the __./mockdata__ folder, and don't forget to add an entry point of the api server for that data.

If you still have questions, it's easy to contact with me: [xjkit54780@gmail.com] (mailto:xjkit54780@gmail.com). Feel free, of course!

## Credits

Normalizr was originally created by [Dan Abramov](http://github.com/gaearon) and inspired by a conversation with [Jing Chen](https://twitter.com/jingc).  
It has since received contributions from different [community members](https://github.com/gaearon/normalizr/graphs/contributors).
