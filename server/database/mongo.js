"use strict";
// functions
const models = require('./models');
const ServerError = require('../utils/ServerError');

// constants
const { DATABASE } = require('../constants');

// dmongo update settings
const updateDefaultConfig = {
  upsert: false,
  new: true,
  runValidators: true,
  setDefaultsOnInsert: true
};

//server error instance returned on mongo queries erros
const serverErrorRes = new ServerError({
  message: DATABASE.ERROR_MESSAGE,
  code: DATABASE.ERROR_CODE,
})

/**
 * [create creates record in database using mongoose create query]
 * @param  {[object]}  params
 * model: {string} collection name to create record in
 * record: {object} to insert in collection
 * @return {object}   if success, return object created in mongo, else return serverError object
 */
const create = async (params) => {
  const {
    model,
    record,
  } = params;

  try {
    const result = await models[model].create(record);
    return result;
  }
  catch (err) {
    console.log('Database Error', err);
    return serverErrorRes;
  }
}

/**
 * [insertMany inserts multiple objects in collection using insertMany mongoose query]
 * @param  {[object]}  params
 * model: {string} collection name to insert multiple records in
 * data: {array} of objects to insert
 * @return {object}  if success data created, else serverError object with database error
 */
const insertMany = async (params) => {
  const {
    model,
    data,
  } = params;
  try {
    const result = await models[model].insertMany(data);
    return result;
  }
  catch (err) {
    console.log('Database Error', err);
    return serverErrorRes;
  }
}

/**
 * [findById gets single object from collection with specific id using findById mongoose query]
 * @param  {[object]}  params
 * model: {string} collection name to get from
 *id: {string} _id to get its record
 * @return {object}  if success record found, else serverError
 */
const findById = async (params) => {
  const {
    model,
    id,
  } = params;
  try {
    const result = await models[model].findById(id);
    return result;
  }
  catch (err) {
    console.log('Database Error', err);
    return serverErrorRes;
  }
}

/**
 * [findOne gets single object from collection based on conditon using findOne mongoose query]
 * @param  {[object]}  params
 * model: {string} collection name to get from
 *conditon {object} condition to find record
 * @return {object}  if success record found, else serverError
 */
const findOne = async (params) => {
  const {
    model,
    condition,
  } = params;
  try {
    const result = await models[model].findOne(condition);
    return result;
  }
  catch (err) {
    console.log('Database Error', err);
    return serverErrorRes;
  }
}

/**
 * [findAll gets multiple data from collection based on conditon using findAll mongoose query]
 * @param  {[object]}  params
 * model: string collection name to get from
 *conditon object condition to find records
 * @return {array}  if success data found, else serverError
 */
const findAll = async (params) => {
  const {
    model,
    condition,
  } = params;
  try {
    const data = await models[model].find();
    return data;
  }
  catch (err) {
    console.log('Database Error', err);
    return serverErrorRes;
  }
}

/**
 * [findOneAndPopulateMany gets single record from collection based on conditon using findOne and populate mongoose query]
 * takes 2 populate fields name to populate from record
 * @param  {[object]}  params
 * model: {string} collection name to get from
 *conditon {object} condition to find object
 *populate1: {string}first collection name to populate its ref field in record
 *populate2: {string} second collection name to populate its ref field in record
 * @return {object}  if success object found with its populated records, else serverError
 */
const findOneAndPopulateMany = async (params) => {
  const {
    model,
    condition,
    populate1,
    populate2,
  } = params;
  try {
    const result = await models[model]
    .findOne(condition)
    .populate(populate1)
    .populate(populate2)
    return result
  }
  catch (err) {
    console.log('err', err);
    return serverErrorRes;
  }
}

/**
 * [findWithLimitAndPopulateMany gets data with limit and skip from collection based on conditon
 * populates 2 ref records]
 * takes 2 populate fields name to populate from record
 * @param  {[object]}  params
 * model: {string} collection name to get from
 *conditon {object} condition to find object
 *populate1: {string}first collection name to populate its ref field in record
 *populate2: {string} second collection name to populate its ref field in record
 * @return {object}  if success object of {totalCount} and {data} found with its populated records, else serverError
 */
const findWithLimitAndPopulateMany = async (params) => {
  const {
    model,
    condition,
    populate1,
    populate2,
    limit,
    offset,
  } = params;
  try {
    const result = await models[model]
    .find(condition)
    .populate(populate1)
    .populate(populate2)
    .limit(parseInt(limit))
    .skip(parseInt(offset)).exec();
    const count = await models[model].countDocuments(condition);
    return { totalCount: count, data: result };
  }
  catch (err) {
    console.log('Database Error', err);
    return serverErrorRes;
  }
}

/**
 * [findByIdAndUpdate updates recod based on _id using findByIdAndUpdate mongoose query
 * @param  {[object]}  params
 * model: {string} collection name to update in
 *id {object} _id to update its object
 *record {object} updated record object
 * @return {array}  if success updated record in mongo else serverError
 */
const findByIdAndUpdate = async (params) => {
  const {
    model,
    _id,
    record
  } = params;
  try {
    const result = await models[model].findByIdAndUpdate(_id, record, updateDefaultConfig);
    return result && result._id ? true : false;
  }
  catch (err) {
    console.log('Database Error', err);
    return serverErrorRes;
  }
}

/**
 * [findByIdAndRemove deletes recod based on _id using findByIdAndRemove mongoose query
 * @param  {[object]}  params
 * model: {string} collection name to get from
 *id {object} _id to remove its object
 * @return {boolean}  if success removed object from mongo, else serverError
 */
const findByIdAndRemove = async (params) => {
  const {
    model,
    id
  } = params;
  try {
    const result = await models[model].findByIdAndRemove(id);
    return result && result._id ? true : false;
  }
  catch (err) {
    console.log('Database Error', err);
    return serverErrorRes;
  }
}

/**
 * [deleteMany deletes recods based on condition using deleteMany mongoose query
 * @param  {[object]}  params
 * model: {string} collection name to get from
 *condition {object} condition to remove records based on
 * @return {boolean}  if success removed object from mongo, else serverError
 */
const deleteMany = async (params) => {
  const {
    model,
    condition
  } = params;
  try {
    const result = await models[model].deleteMany(condition);
    return result ? true : false;
  }
  catch (err) {
    console.log('Database Error', err);
    return serverErrorRes;
  }
}

module.exports = {
  create,
  insertMany,
  findById,
  findOne,
  findOneAndPopulateMany,
  findWithLimitAndPopulateMany,
  findAll,
  findByIdAndUpdate,
  findByIdAndRemove,
  deleteMany,
}
