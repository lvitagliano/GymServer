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
        getCurrentUser: (root, { token }) =>{
            if (!token) {
                return null
            }
            const currentUser = jwt.verify(token, process.env.SECRET)

            return currentUser
        },
        login: async (root, { email }) => {
            let db
            let users = []
    
            try {
                db = await connectDB()
                users = await db.collection('users').findOne({ email: email })
            } catch (error) {
            }
            return users
        },
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
        getUserByProfile: async (root, { profile }) => {
            let db
            let users = []
    
            try {
                db = await connectDB()
                users = await db.collection('users').find({profile: profile}).toArray()
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
        getMuscleById: async (root, { id }) => {
            let db
            let muscle = []
    
            try {
                db = await connectDB()
                muscle = await db.collection('muscles').findOne({ _id: ObjectID(id) })
            } catch (error) {
            }
            return muscle
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
        getExerciseByMuscle: async (root, { muscle }) => {
            let db
            let exercises = []
            try {
                db = await connectDB()
                exercises = await db.collection('exercises').find({muscle: muscle}).toArray()
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
        getSerieByRutine: async (root, { rutine }) => {
            let db
            let serie = []
    
            try {
                db = await connectDB()
                serie = await db.collection('series').find({ rutine: rutine }).toArray()
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
                routines = await db.collection('routines').find({ student: studentId}).toArray()
            } catch (error) {
                console.log('error',error)
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
        getAllRoutinesDo: async () => {
            let db
            let routines = []
    
            try {
                db = await connectDB()
                routines = await db.collection('routinesdo').find().toArray()
            } catch (error) {
            }
            return routines
        },
        getRoutineDoById: async (root, { id }) => {
            let db
            let routine = []
    
            try {
                db = await connectDB()
                routine = await db.collection('routinesdo').findOne({ _id: ObjectID(id) })
            } catch (error) {
            }
            return routine
        },
        getRoutineDoByRutine: async (root, { rutine }) => {
            let db
            let routine = []
    
            try {
                db = await connectDB()
                routine = await db.collection('routinesdo').findOne({rutine: rutine })
            } catch (error) {
            }
            return routine
        },
        getRoutineDoByTeacher: async (root, { teacherId }) => {
            let db
            let routine = []
    
            try {
                db = await connectDB()
                routine = await db.collection('routinesdo').find({teacher: teacherId }).toArray()
            } catch (error) {
            }
            return routine
        },
        getRoutineDoByStudent: async (root, { idStudent }) => {
            let db
            let routine = []
    
            try {
                db = await connectDB()
                routine = await db.collection('routinesdo').find({student: idStudent }).toArray()
            } catch (error) {
            }
            return routine
        },
        getAllDayForRutine: async (root, {rutine}) => {
            let db
            let routines = []
    
            try {
                db = await connectDB()
                routines = await db.collection('dayforrutine').find({rutine: rutine}).toArray()
            } catch (error) {
            }
            return routines
        },
        getAllDayForRutineStudent: async (root, {student}) => {
            let db
            let routines = []
    
            try {
                db = await connectDB()
                routines = await db.collection('dayforrutine').find({student: student}).toArray()
            } catch (error) {
            }
            return routines
        },
        getDayForRutineById: async (root, { id }) => {
            let db
            let routine = []
    
            try {
                db = await connectDB()
                routine = await db.collection('dayforrutine').findOne({ _id: ObjectID(id) })
            } catch (error) {
            }
            return routine
        },
        getAllDayForRutineDo: async (root, {rutineDo}) => {
            let db
            let routines = []
    
            try {
                db = await connectDB()
                routines = await db.collection('dayforrutinedo').find({rutineDo: rutineDo}).toArray()
            } catch (error) {
            }
            return routines
        },
        getAllDayForRutineDoStudent: async (root, {student}) => {
            let db
            let routines = []
    
            try {
                db = await connectDB()
                routines = await db.collection('dayforrutinedo').find({student: student}).toArray()
            } catch (error) {
            }
            return routines
        },
        getDayForRutineDoById: async (root, { id }) => {
            let db
            let routine = []
    
            try {
                db = await connectDB()
                routine = await db.collection('dayforrutinedo').findOne({ _id: ObjectID(id) })
            } catch (error) {
            }
            return routine
        },
        getAllSeriesForDay: async (root, {dayForRutine}) => {
            let db
            let routines = []
    
            try {
                db = await connectDB()
                routines = await db.collection('seriesforday').find({dayForRutine: dayForRutine}).toArray()
            } catch (error) {
            }
            return routines
        },
        getAllSeriesForStudent: async (root, {student}) => {
            let db
            let routines = []
    
            try {
                db = await connectDB()
                routines = await db.collection('seriesforday').find({student: student}).toArray()
            } catch (error) {
            }
            return routines
        },
        getSeriesForDayById: async (root, { id }) => {
            let db
            let routine = []
    
            try {
                db = await connectDB()
                routine = await db.collection('seriesforday').findOne({ _id: ObjectID(id) })
            } catch (error) {
            }
            return routine
        },
    },
    Mutation: {
        auth: async (root,{email,password}) =>{
            let db
            let users = null
            let userToLogin = []
    
                
            try {
                db = await connectDB()
                users = await db.collection('users').findOne({ email: email })
            } catch (error) {
            }

            if (!users) {
                throw new Error('El usuario ingresado no existe o es incorrecto.');
            } else {
                userToLogin = {
                    _id: users._id,
                    email: users.email,
                    firstName: users.firstName,
                    lastName: users.lastName,
                    phone: users.phone,
                    nac: users.nac,
                    gender: users.gender,
                    profile: users.profile,
                    weightStart: users.weightStart,
                    weightActual: users.weightActual,
                }
            }
            const pass= await bcrypt.compare(password, users.password)
            if (!pass) {
                throw new Error('La contraseña ingresada es incorrecta.');
            }

            return newToken(userToLogin, process.env.SECRET, '24hr')

        },
        createUser: async (root, { input }) => {
            let db 
            let user
            const {password} = input
            const salt = await bcrypt.genSalt(10)
            input.password= await bcrypt.hash(password,salt)

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
            return input
        },
        createMuscle: async (root, { input }) => {
            let db 
            let muscle

            const newMuscle = ({
                ...input,
                createdOn: new Date(),
                modifiedOn: new Date()
            })

            try {
                db = await connectDB()
                muscle = await db.collection('muscles').insertOne(newMuscle)
                input._id = muscle.insertedId
            } catch (error) {
                console.error(error)
            }
            return input
        },
        createExercise: async (root, { input }) => {
            let db 
            let exercise

            const newExercise = ({
                ...input,
                createdOn: new Date(),
                modifiedOn: new Date()
            })

            try {
                db = await connectDB()
                exercise = await db.collection('exercises').insertOne(newExercise)
                input._id = exercise.insertedId
            } catch (error) {
                console.error(error)
            }
            return input
        },
        createSeries: async (root, { input }) => {
            let db 
            let serie

            const newSerie = ({
                ...input,
                createdOn: new Date(),
                modifiedOn: new Date()
            })

            try {
                db = await connectDB()
                serie = await db.collection('series').insertOne(newSerie)
                input._id = serie.insertedId
            } catch (error) {
                console.error(error)
            }
            return input
        },
        createRoutines: async (root, { input }) => {
            let db 
            let routine
            let rutina = input

            const newRoutines = ({
                ...input,
                createdOn: new Date(),
                modifiedOn: new Date()
            })

            try {
                db = await connectDB()
                routine = await db.collection('routines').insertOne(newRoutines)
                rutina._id = routine.insertedId
            } catch (error) {
                console.error(error)
            }
            return rutina
        },
        createRutineDoIt: async (root, { input }) => {
            let db 
            let routine
            let rutina = input

            const newRoutines = ({
                ...input,
                createdOn: new Date(),
                modifiedOn: new Date()
            })

            try {
                db = await connectDB()
                routine = await db.collection('routinesdo').insertOne(newRoutines)
                rutina._id = routine.insertedId
            } catch (error) {
                console.error(error)
            }
            return rutina
        },
        createDayForRutine: async (root, { input }) => {
            let db 
            let routine
            let rutina = input

            const newRoutines = ({
                ...input,
                createdOn: new Date(),
                modifiedOn: new Date()
            })
            console.log('input',input)
            try {
                db = await connectDB()
                routine = await db.collection('dayforrutine').insertOne(newRoutines)
                rutina._id = routine.insertedId
            } catch (error) {
                console.error(error)
            }
            return rutina
        },
        createDayForRutineDo: async (root, { input }) => {
            let db 
            let routine
            let rutina = input

            const newRoutines = ({
                ...input,
                createdOn: new Date(),
                modifiedOn: new Date()
            })

            try {
                db = await connectDB()
                routine = await db.collection('dayforrutinedo').insertOne(newRoutines)
                rutina._id = routine.insertedId
            } catch (error) {
                console.error(error)
            }
            return rutina
        },
        createSeriesForDay: async (root, { input }) => {
            let db 
            let routine
            let rutina = input

            const newRoutines = ({
                ...input,
                createdOn: new Date(),
                modifiedOn: new Date()
            })

            try {
                db = await connectDB()
                routine = await db.collection('seriesforday').insertOne(newRoutines)
                rutina._id = routine.insertedId
            } catch (error) {
                console.error(error)
            }
            return rutina
        },


        updateUser: async (root, { _id, input }) => {
            let db 
            let userInput
            try {
                db = await connectDB()
                await db.collection('users').updateOne({ _id: ObjectID(_id)},{ $set: input })
                userInput = await db.collection('users').findOne({ _id: ObjectID(_id) })
            } catch (error) {
                console.error(error)
            }
            return userInput
        },
        updateMuscle: async (root, { _id, input }) => {
            let db 
            let musclesInput
            try {
                db = await connectDB()
                await db.collection('muscles').updateOne({ _id: ObjectID(_id)},{ $set: input })
                musclesInput = await db.collection('muscles').findOne({ _id: ObjectID(_id) })
            } catch (error) {
                console.error(error)
            }
            return musclesInput
        },
        updateExercise: async (root, { _id, input }) => {
            let db 
            let exercisesInput
            try {
                db = await connectDB()
                await db.collection('exercises').updateOne({ _id: ObjectID(_id)},{ $set: input })
                exercisesInput = await db.collection('exercises').findOne({ _id: ObjectID(_id) })
            } catch (error) {
                console.error(error)
            }
            return exercisesInput
        },
        updateSeries: async (root, { _id, input }) => {
            let db 
            let seriesInput
            try {
                db = await connectDB()
                await db.collection('series').updateOne({ _id: ObjectID(_id)},{ $set: input })
                seriesInput = await db.collection('series').findOne({ _id: ObjectID(_id) })
            } catch (error) {
                console.error(error)
            }
            return seriesInput
        },
        updateRoutines: async (root, { _id, input }) => {
            let db 
            let routine
            try {
                db = await connectDB()
                await db.collection('routines').updateOne({ _id: ObjectID(_id)},{ $set: input })
                routine = await db.collection('routines').findOne({ _id: ObjectID(_id) })

            } catch (error) {
                console.error(error)
            }
            return routine
        },
        updateRoutinesDo: async (root, { _id, input }) => {
            let db 
            let routine
            try {
                db = await connectDB()
                await db.collection('routinesdo').updateOne({ _id: ObjectID(_id)},{ $set: input })
                routine = await db.collection('routinesdo').findOne({ _id: ObjectID(_id) })

            } catch (error) {
                console.error(error)
            }
            return routine
        },
        updateDayForRoutines: async (root, { _id, input }) => {
            let db 
            let routine
            try {
                db = await connectDB()
                await db.collection('dayforrutine').updateOne({ _id: ObjectID(_id)},{ $set: input })
                routine = await db.collection('dayforrutine').findOne({ _id: ObjectID(_id) })

            } catch (error) {
                console.error(error)
            }
            return routine
        },
        updateDayForRoutinesDo: async (root, { _id, input }) => {
            let db 
            let routine
            try {
                db = await connectDB()
                await db.collection('dayforrutinedo').updateOne({ _id: ObjectID(_id)},{ $set: input })
                routine = await db.collection('dayforrutinedo').findOne({ _id: ObjectID(_id) })

            } catch (error) {
                console.error(error)
            }
            return routine
        },
        updateSeriesForDay: async (root, { _id, input }) => {
            let db 
            let routine
            try {
                db = await connectDB()
                await db.collection('seriesforday').updateOne({ _id: ObjectID(_id)},{ $set: input })
                routine = await db.collection('seriesforday').findOne({ _id: ObjectID(_id) })

            } catch (error) {
                console.error(error)
            }
            return routine
        },

        deleteUser: async (root, { _id }) => {
            let db 
            let user
            try {
                db = await connectDB()
                user = await db.collection('users').deleteOne( {_id: ObjectID(_id)})
            } catch (error) {
                console.error(error)
            }
            return 'Eliminado correctamente'
        },
        deleteMuscle: async (root, { _id }) => {
            let db 
            let musclesInput
            try {
                db = await connectDB()
                musclesInput = await db.collection('muscles').deleteOne( {_id: ObjectID(_id)})
            } catch (error) {
                console.error(error)
            }
            return 'Eliminado correctamente'
        },
        deleteExercise: async (root, { _id }) => {
            let db 
            let Exercise
            try {
                db = await connectDB()
                Exercise = await db.collection('exercises').deleteOne( {_id: ObjectID(_id)})
            } catch (error) {
                console.error(error)
            }
            return 'Eliminado correctamente'
        },
        deleteSeries: async (root, { _id }) => {
            let db 
            let series
            try {
                db = await connectDB()
                series = await db.collection('series').deleteOne( {_id: ObjectID(_id)})
            } catch (error) {
                console.error(error)
            }
            return 'Eliminado correctamente'
        },
        deleteRutines: async (root, { _id }) => {
            let db 
            let rutines
            try {
                db = await connectDB()
                rutines = await db.collection('rutines').deleteOne( {_id: ObjectID(_id)})
            } catch (error) {
                console.error(error)
            }
            return 'Eliminado correctamente'
        },
        deleteRutinesDo: async (root, { _id }) => {
            let db 
            let rutines
            try {
                db = await connectDB()
                rutines = await db.collection('routinesdo').deleteOne( {_id: ObjectID(_id)})
            } catch (error) {
                console.error(error)
            }
            return 'Eliminado correctamente'
        },
        deleteDayForRoutines: async (root, { _id }) => {
            let db 
            let rutines
            try {
                db = await connectDB()
                rutines = await db.collection('dayforrutine').deleteOne( {_id: ObjectID(_id)})
            } catch (error) {
                console.error(error)
            }
            return 'Eliminado correctamente'
        },
        deleteDayForRoutinesDo: async (root, { _id }) => {
            let db 
            let rutines
            try {
                db = await connectDB()
                rutines = await db.collection('dayforrutinedo').deleteOne( {_id: ObjectID(_id)})
            } catch (error) {
                console.error(error)
            }
            return 'Eliminado correctamente'
        },
        deleteSeriesForDay: async (root, { _id }) => {
            let db 
            let rutines
            try {
                db = await connectDB()
                rutines = await db.collection('seriesforday').deleteOne( {_id: ObjectID(_id)})
            } catch (error) {
                console.error(error)
            }
            return 'Eliminado correctamente'
        },

    },
    ...types
}
