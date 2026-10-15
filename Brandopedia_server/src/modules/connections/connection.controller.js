
const mongoose = require('mongoose');
const connectionService = require('./connection.service');

async function createConnectionRequest(req, res, next) {
  try {
    const { senderId, receiverId } = req.body || {};

    if (
      typeof senderId !== 'string' ||
      typeof receiverId !== 'string' ||
      !mongoose.isValidObjectId(senderId) ||
      !mongoose.isValidObjectId(receiverId)
    ) {
      return res.status(400).json({
        message: 'Valid senderId and receiverId are required',
      });
    }

    const request = await connectionService.requestConnection(
      senderId,
      receiverId
    );

    return res.status(201).json({
      message: 'Connection request saved',
      request,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { createConnectionRequest };
