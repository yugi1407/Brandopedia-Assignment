require('dotenv').config();

const mongoose = require('mongoose');
const connectDatabase = require('../src/config/database');
const User = require('../src/modules/users/user.model');
const Post = require('../src/modules/posts/post.model');
const Connection = require('../src/modules/connections/connection.model');

const usersSeed = [
  { name: 'Alex Morgan', occupation: 'Product Designer', profileImage: 'https://res.cloudinary.com/bgb0vq7d/image/upload/f_auto/q_auto/Image-3.png' },
  { name: 'Jamie Lee', occupation: 'Software Engineer', profileImage: 'https://res.cloudinary.com/bgb0vq7d/image/upload/f_auto/q_auto/Image.png' },
  { name: 'Taylor Smith', occupation: 'Marketing Manager', profileImage: 'https://res.cloudinary.com/bgb0vq7d/image/upload/f_auto/q_auto/Image-1.png' },
  { name: 'Jordan Patel', occupation: 'Photographer', profileImage: 'https://res.cloudinary.com/bgb0vq7d/image/upload/f_auto/q_auto/Image-2.png' },
  { name: 'Casey Brown', occupation: 'Founder', profileImage: 'https://res.cloudinary.com/bgb0vq7d/image/upload/f_auto/q_auto/Image-4.png' }
];

const postImages = [
  'https://res.cloudinary.com/bgb0vq7d/image/upload/f_auto,q_auto/create-post-image-5_2x',
  'https://res.cloudinary.com/bgb0vq7d/image/upload/f_auto,q_auto/create-post-image-4_2x',
  'https://res.cloudinary.com/bgb0vq7d/image/upload/f_auto,q_auto/create-post-image-3_2x',
  'https://res.cloudinary.com/bgb0vq7d/image/upload/f_auto,q_auto/create-post-image-2_2x',
  'https://res.cloudinary.com/bgb0vq7d/image/upload/f_auto,q_auto/create-post-image-1_2x',
];

async function seed() {
  try {
    await connectDatabase();

    // Re-seeding replaces these demo records and their related connection requests.
    await Connection.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});

    const users = await User.insertMany(usersSeed);
    const postSeed = [
      {
        content: 'Excited to share what our team has been building this week.',
        author: users[0]._id,
        image: postImages[0],
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
      {
        content: 'A little progress every day adds up to big results.',
        author: users[1]._id,
        image: postImages[1],
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      {
        content: 'Met some amazing people and learned a lot from the conversation.',
        author: users[2]._id,
        image: postImages[2],
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      },
      {
        content: 'Working on a new creative project. More updates soon!',
        author: users[3]._id,
        image: postImages[3],
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        content: 'Grateful for the people who make collaboration meaningful.',
        author: users[4]._id,
        image: postImages[4],
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ];

    await Post.insertMany(postSeed);
    console.log('Seed complete: 5 users and 5 posts created.');
    console.log('Current user ID (first seeded user):', String(users[0]._id));
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
