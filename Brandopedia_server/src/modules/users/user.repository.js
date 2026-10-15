
const User = require('./user.model');
const Connection = require('../connections/connection.model');

async function findDiscoverUsers(currentUserId, { page, limit }) {
  return User.find({
    _id: { $ne: currentUserId },
  })
    .select('_id name occupation profileImage')
    .sort({ _id: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
}

async function findById(id) {
  return User.findById(id).lean();
}

async function findRequestedUserIds(senderId) {
  const requests = await Connection.find({ sender: senderId })
    .select('receiver -_id')
    .lean();

  return requests.map((request) => String(request.receiver));
}

module.exports = {
  findDiscoverUsers,
  findById,
  findRequestedUserIds,
};
