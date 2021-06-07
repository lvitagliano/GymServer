'use strict'
const {GraphQLDateTime} = require('graphql-iso-date');
const connectDB = require('../database');
const { ObjectID } = require('mongodb');

module.exports = {
    Date: GraphQLDateTime,

    Exercise: {
        muscle: async ({ muscle }) => {
            let db
            let muscleData
            let ids

            try {
                db = await connectDB()
                ids = muscle ? muscle.map(id => ObjectID(id)) : []
                muscleData = ids.length > 0 
                ? await  db.collection('muscles').find(
                    { _id: { $in: ids } }
                ).toArray()
                : []

            } catch (error) {
                console.error(error)
            }

            return muscleData
        },
    },

    Serie: {
        exercise: async ({ exercise }) => {
            let db
            let exerciseData
            let ids

            try {
                db = await connectDB()
                exerciseData = await db.collection('exercises').findOne({ _id: ObjectID(exercise) })

            } catch (error) {
                console.error(error)
            }

            return exerciseData
        },
    },

    Routine: {
        student: async ({ student }) => {
            let db
            let studentData
            let ids

            try {
                db = await connectDB()
                studentData = await db.collection('users').findOne({ _id: ObjectID(student) })

            } catch (error) {
                console.error(error)
            }

            return studentData
        },
        teacher: async ({ teacher }) => {
            let db
            let teacherData
            let ids

            try {
                db = await connectDB()
                teacherData = await db.collection('users').findOne({ _id: ObjectID(teacher) })

            } catch (error) {
                console.error(error)
            }

            return teacherData
        },
        serie: async ({ serie }) => {
            let db
            let serieData
            let ids

            try {
                db = await connectDB()
                ids = serie ? serie.map(id => ObjectID(id)) : []
                serieData = ids.length > 0 
                ? await  db.collection('series').find(
                    { _id: { $in: ids } }
                ).toArray()
                : []

            } catch (error) {
                console.error(error)
            }

            return serieData
        },
    },

}