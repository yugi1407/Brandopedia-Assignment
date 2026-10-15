
const Connection = require('./connection.model');

async function createRequest(senderId, receiverId) {
  try {
    return await Connection.findOneAndUpdate(
      { sender: senderId, receiver: receiverId },
      {
        $setOnInsert: {
          sender: senderId,
          receiver: receiverId,
          status: 'requested',
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    ).lean();
  } catch (error) {
    if (error.code !== 11000) {
      throw error;
    }

    // Another concurrent request may have inserted this pair.
    const existingRequest = await Connection.findOne({
      sender: senderId,
      receiver: receiverId,
    }).lean();

    if (existingRequest) {
      return existingRequest;
    }

    throw error;
  }
}

module.exports = { createRequest };
