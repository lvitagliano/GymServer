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
                ids = student ? student.map(id => ObjectID(id)) : []
                
                studentData = ids.length > 0 
                ? await  db.collection('users').find(
                    { _id: { $in: ids } }
                ).toArray()
                : []
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
        rutineDay: async ({ rutineDay }) => {
            let db
            let rutineDayData
            let ids

            console.log('rutineDay',rutineDay)

            try {
                db = await connectDB()
                ids = rutineDay ? rutineDay.map(id => ObjectID(id)) : []
                rutineDayData = ids.length > 0 
                ? await  db.collection('dayforrutine').find(
                    { _id: { $in: ids } }
                ).toArray()
                : []

            } catch (error) {
                console.error(error)
            }

            console.log('rutineDayData',rutineDayData)
            return rutineDayData
        },
    },

    SeriesForDay: {
        serie: async ({ serie }) => {
            let db
            let serieData
            let ids

            try {
                db = await connectDB()
                serieData = await db.collection('series').findOne({ _id: ObjectID(serie) })

            } catch (error) {
                console.error(error)
            }

            return serieData
        },
        dayForRutine: async ({ dayForRutine }) => {
            let db
            let dayForRutineData
            let ids

            try {
                db = await connectDB()
                dayForRutineData = await db.collection('dayforrutine').findOne({ _id: ObjectID(dayForRutine) })

            } catch (error) {
                console.error(error)
            }

            return dayForRutineData
        },
    },

    DayForRutine: {
        serieforday: async ({ serieforday }) => {
            let db
            let serieData
            let ids

            try {
                db = await connectDB()
                ids = serieforday ? serieforday.map(id => ObjectID(id)) : []
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
        rutine: async ({ rutine }) => {
            let db
            let rutineDoData
            let ids

            try {
                db = await connectDB()
                rutineDoData = await db.collection('routines').findOne({ _id: ObjectID(rutine) })

            } catch (error) {
                console.error(error)
            }

            return rutineDoData
        },
    },

    DayForRutineDo: {
        serieforday: async ({ serieforday }) => {
            let db
            let serieData
            let ids

            try {
                db = await connectDB()
                ids = serieforday ? serieforday.map(id => ObjectID(id)) : []
                serieData = ids.length > 0 
                ? await  db.collection('seriesforday').find(
                    { _id: { $in: ids } }
                ).toArray()
                : []

            } catch (error) {
                console.error(error)
            }

            return serieData
        },
        rutineDo: async ({ rutineDo }) => {
            let db
            let rutineDoData
            let ids

            try {
                db = await connectDB()
                rutineDoData = await db.collection('routinesdo').findOne({ _id: ObjectID(rutineDo) })

            } catch (error) {
                console.error(error)
            }

            return rutineDoData
        },
    },
    RutineDo: {
        rutineDay: async ({ rutineDay }) => {
            let db
            let rutineDayData
            let ids

            try {
                db = await connectDB()
                ids = rutineDay ? rutineDay.map(id => ObjectID(id)) : []
                rutineDayData = ids.length > 0 
                ? await  db.collection('dayforrutine').find(
                    { _id: { $in: ids } }
                ).toArray()
                : []

            } catch (error) {
                console.error(error)
            }

            return rutineDayData
        },
        rutine: async ({ rutine }) => {
            let db
            let rutineData
            let ids

            try {
                db = await connectDB()
                rutineData = await db.collection('routines').findOne({ _id: ObjectID(rutine) })

            } catch (error) {
                console.error(error)
            }

            return rutineData
        },
        teacher: async ({ teacher }) => {
            let db
            let userData
            let ids

            try {
                db = await connectDB()
                userData = await db.collection('users').findOne({ _id: ObjectID(teacher) })

            } catch (error) {
                console.error(error)
            }

            return userData
        },
        student: async ({ student }) => {
            let db
            let userData
            let ids

            try {
                db = await connectDB()
                userData = await db.collection('users').findOne({ _id: ObjectID(student) })

            } catch (error) {
                console.error(error)
            }

            return userData
        },
    },
}