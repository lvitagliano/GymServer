'use strict'
const {GraphQLDateTime} = require('graphql-iso-date');
const connectDB = require('../database');
const { ObjectID } = require('mongodb');

module.exports = {
    Date: GraphQLDateTime,

}