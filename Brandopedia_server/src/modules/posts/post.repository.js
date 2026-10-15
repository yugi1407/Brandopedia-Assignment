const Post = require('./post.model');

async function findAll() {
  return Post.find()
    .sort({ timestamp: -1 })
    .populate('author', 'name occupation profileImage')
    .lean();
}

module.exports = { findAll };
