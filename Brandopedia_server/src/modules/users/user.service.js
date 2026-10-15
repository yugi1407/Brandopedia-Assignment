
const userRepository = require('./user.repository');

async function getUsers(currentUserId, pagination) {
  const [currentUser, users, requestedUserIds] = await Promise.all([
    userRepository.findById(currentUserId),
    userRepository.findDiscoverUsers(currentUserId, pagination),
    userRepository.findRequestedUserIds(currentUserId),
  ]);

  if (!currentUser) {
    const error = new Error('Current user not found');
    error.statusCode = 404;
    throw error;
  }

  return {
    users,
    currentUser: {
      _id: String(currentUser._id),
      name: currentUser.name,
      occupation: currentUser.occupation,
      profileImage: currentUser.profileImage,
    },
    requestedUserIds,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      hasMore: users.length === pagination.limit,
    },
  };
}

module.exports = { getUsers };
