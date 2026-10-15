
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    occupation: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    profileImage: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          try {
            const url = new URL(value);
            return ['http:', 'https:'].includes(url.protocol);
          } catch {
            return false;
          }
        },
        message: 'profileImage must be a valid HTTP(S) URL',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
