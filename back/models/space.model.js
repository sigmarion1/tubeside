const { nanoid } = require('nanoid');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const spaceSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(8),
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    currentVideoName: {
      type: String,
    },
    currentVideoId: {
      type: String,
    },
    userCount: {
      type: Number,
      default: 0,
    },
    syncUser: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
spaceSchema.plugin(toJSON);
spaceSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The user's email
 * @param {ObjectId} [excludeSpaceId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
spaceSchema.statics.isSpaceNameTaken = async function (name, excludeSpaceId) {
  const space = await this.findOne({ name, _id: { $ne: excludeSpaceId } });
  return !!space;
};

/**
 * @typedef Space
 */
const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
