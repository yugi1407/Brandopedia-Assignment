
const mongoose = require('mongoose');
const userService = require('./user.service');

async function getUsers(req, res, next) {
  try {
    const { currentUserId } = req.query;

    if (!currentUserId) {
      return res.status(400).json({
        message: 'currentUserId query parameter is required',
      });
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
