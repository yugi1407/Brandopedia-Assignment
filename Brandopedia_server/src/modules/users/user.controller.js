
const mongoose = require('mongoose');
const userService = require('./user.service');
const User = require('./user.model');

async function getUsers(req, res, next) {
  try {
    let { currentUserId } = req.query;

    // Default to the first user if no ID is provided
    if (!currentUserId) {
      const firstUser = await User.findOne()
        .sort({ createdAt: 1, _id: 1 })
        .select('_id');

      if (!firstUser) {
        return res.status(404).json({
          message: 'No users found. Please run the seed script.',
        });
      }

      currentUserId = firstUser._id.toString();
    }

    if (!mongoose.isValidObjectId(currentUserId)) {
      return res.status(400).json({
        message: 'Invalid currentUserId',
      });
    }

    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);

    if (
      !Number.isSafeInteger(page) ||
      page < 1 ||
      !Number.isSafeInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        message: 'page must be positive and limit must be between 1 and 100',
      });
    }

    const result = await userService.getUsers(
      currentUserId,
      { page, limit }
    );

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { getUsers };
