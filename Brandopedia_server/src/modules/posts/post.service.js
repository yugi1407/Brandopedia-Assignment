const postRepository = require('./post.repository');

async function getPosts() {
  return postRepository.findAll();
}

module.exports = { getPosts };
