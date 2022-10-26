const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => timeSince(date),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Creates virtual property 'reactionCount' that counts a thought's reactions
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

// Initializes  model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;