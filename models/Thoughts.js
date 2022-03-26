// Require Mongoose and dateFormat
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// ReactionsSchema
const ReactionsSchema = new Schema(
  {
    // Set custom ID to avoid confusion with parent thoughts _id field
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// ThoughtsSchema
const ThoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    // Use ReactionsSchema to validate data
    reactions: [ReactionsSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of reactions
ThoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create the Thoughts model using the Thoughts Schema
const Thoughts = model("Thoughts", ThoughtsSchema);

// Export Thoughts Module
module.exports = Thoughts;
