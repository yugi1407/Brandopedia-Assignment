
const mongoose = require('mongoose');
const User = require('../users/user.model');
const connectionRepository = require('./connection.repository');

async function requestConnection(senderId, receiverId) {
  if (
    !mongoose.isValidObjectId(senderId) ||
    !mongoose.isValidObjectId(receiverId)
  ) {
    const error = new Error('Invalid senderId or receiverId');
    error.statusCode = 400;
    throw error;
  }

  if (senderId === receiverId) {
    const error = new Error(
      'You cannot send a connection request to yourself'
    );
    error.statusCode = 400;
    throw error;
  }

  const [sender, receiver] = await Promise.all([
    User.exists({ _id: senderId }),
    User.exists({ _id: receiverId }),
  ]);

  if (!sender || !receiver) {
    const error = new Error('Sender or receiver not found');
    error.statusCode = 404;
    throw error;
  }

  return connectionRepository.createRequest(senderId, receiverId);
}

module.exports = { requestConnection };
