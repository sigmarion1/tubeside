const httpStatus = require('http-status');
const { Space } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} spaceBody
 * @returns {Promise<Space>}
 */
const createSpace = async (spaceBody) => {
  if (await Space.isSpaceNameTaken(spaceBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Space name already taken');
  }
  return Space.create(spaceBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySpaces = async (filter, options) => {
  const spaces = await Space.paginate(filter, options);
  return spaces;
};

/**
 * Get space by id
 * @param {ObjectId} id
 * @returns {Promise<Space>}
 */
const getSpaceById = async (id) => {
  return Space.findById(id);
};

/**
 * Update space by id
 * @param {ObjectId} spaceId
 * @param {Object} updateBody
 * @returns {Promise<Space>}
 */
const updateSpaceById = async (spaceId, updateBody) => {
  const space = await getSpaceById(spaceId);
  if (!space) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Space not found');
  }
  Object.assign(space, updateBody);
  await space.save();
  return space;
};

/**
 * Delete user by id
 * @param {ObjectId} spaceId
 * @returns {Promise<Space>}
 */
const deleteSpaceById = async (spaceId) => {
  const space = await getSpaceById(spaceId);
  if (!space) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Space not found');
  }
  await space.remove();
  return space;
};

module.exports = {
  createSpace,
  querySpaces,
  getSpaceById,
  updateSpaceById,
  deleteSpaceById,
};
