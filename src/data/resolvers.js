'use strict'
const connectDB = require('../database');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {GraphQLDateTime} = require('graphql-iso-date');
const types = require('./types');
const axios = require("axios")

const newToken = (userLogin, secret, expiresIn) => {
    const token = jwt.sign(userLogin, secret, { expiresIn })
    return token
}

module.exports = {
    Date: GraphQLDateTime,

    Query: {
        getAllUsers: async () => {
            let db
            let users = []
    
            try {
                db = await connectDB()
                users = await db.collection('users').find().toArray()
            } catch (error) {
            }
            return users
        },
        getUserById: async (root, { id }) => {
            let db
            let user = []
    
            try {
                db = await connectDB()
                user = await db.collection('users').findOne({ _id: ObjectID(id) })
            } catch (error) {
            }
            return user
        },
        getAllMuscles: async () => {
            let db
            let muscles = []
    
            try {
                db = await connectDB()
                muscles = await db.collection('muscles').find().toArray()
            } catch (error) {
            }
            return muscles
        },
        getMusclesById: async (root, { id }) => {
            let db
            let muscle = []
    
            try {
                db = await connectDB()
                muscle = await db.collection('muscles').findOne({ _id: ObjectID(id) })
            } catch (error) {
            }
            return muscles
        },
        getAllExercises: async () => {
            let db
            let exercises = []
    
            try {
                db = await connectDB()
                exercises = await db.collection('exercises').find().toArray()
            } catch (error) {
            }
            return exercises
        },
        getExerciseById: async (root, { id }) => {
            let db
            let exercise = []
    
            try {
                db = await connectDB()
                exercise = await db.collection('exercises').findOne({ _id: ObjectID(id) })
            } catch (error) {
            }
            return exercise
        },
        getExerciseByMuscle: async (root, {muscleID}) => {
            let db
            let exercises = []
    
            try {
                db = await connectDB()
                exercises = await db.collection('exercises').find({musclesInvolved: muscleID}).toArray()
            } catch (error) {
            }
            return exercises
        },
        getAllSeries: async () => {
            let db
            let series = []
    
            try {
                db = await connectDB()
                series = await db.collection('series').find().toArray()
            } catch (error) {
            }
            return series
        },
        getSerieById: async (root, { id }) => {
            let db
            let serie = []
    
            try {
                db = await connectDB()
                serie = await db.collection('series').findOne({ _id: ObjectID(id) })
            } catch (error) {
            }
            return serie
        },
        getAllRoutines: async () => {
            let db
            let routines = []
    
            try {
                db = await connectDB()
                routines = await db.collection('routines').find().toArray()
            } catch (error) {
            }
            return routines
        },
        getRoutineById: async (root, { id }) => {
            let db
            let routine = []
    
            try {
                db = await connectDB()
                routine = await db.collection('routines').findOne({ _id: ObjectID(id) })
            } catch (error) {
            }
            return routine
        },
        getRoutineByStudent: async (root, {studentId}) => {
            let db
            let routines = []
    
            try {
                db = await connectDB()
                routines = await db.collection('routines').find({student: studentId}).toArray()
            } catch (error) {
            }
            return routines
        },
        getRoutineByTeacher: async (root, {teacherId}) => {
            let db
            let routines = []
    
            try {
                db = await connectDB()
                routines = await db.collection('routines').find({teacher: teacherId}).toArray()
            } catch (error) {
            }
            return routines
        },

    },
    Mutation: {
        createUser: async (root, { input }) => {
            let db 
            let user

            const newUser = ({
                ...input,
                createdOn: new Date(),
                modifiedOn: new Date()
            })

            try {
                db = await connectDB()
                user = await db.collection('users').insertOne(newUser)
                input._id = user.insertedId
            } catch (error) {
                console.error(error)
            }
            return user
        },
    },
    ...types
}
