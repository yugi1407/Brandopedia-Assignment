const postService = require('./post.service');

async function getPosts(req, res, next) {
  try {
    const posts = await postService.getPosts();
    res.json({ posts });
  } catch (error) {
    next(error);
  }
}

module.exports = { getPosts };
