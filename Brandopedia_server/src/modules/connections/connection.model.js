
const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
    },
    status: {
      type: String,
      enum: ['requested'],
      default: 'requested',
      required: true,
    },
  },
  { timestamps: true }
);

connectionSchema.index(
  { sender: 1, receiver: 1 },
  { unique: true, name: 'unique_sender_receiver' }
);

module.exports = mongoose.model('Connection', connectionSchema);
