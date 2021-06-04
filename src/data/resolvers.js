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
        getProfessionals: async () => {
            let db
            let professionals = []
    
            try {
                db = await connectDB()
                professionals = await db.collection('professionals').find().toArray()
            } catch (error) {
            }
            return professionals
        },
        getProfessional: async (root, { id }) => {
            let db
            let professional = []
    
            try {
                db = await connectDB()
                professional = await db.collection('professionals').findOne({ _id: ObjectID(id) })
            } catch (error) {
            }
            return professional
        },
        getPatients: async () => {
            let db
            let patients = []
    
            try {
                db = await connectDB()
                patients = await db.collection('patients').find().toArray()
            } catch (error) {
            }
            return patients
        },
        getPatient: async (root, { id }) => {
            let db
            let patient = []
    
            try {
                db = await connectDB()
                patient = await db.collection('patients').findOne({ _id: ObjectID(id) })
            } catch (error) {
            }
            return patient
        },
        getInstitucions: async () => {
            let db
            let institutions = []
    
            try {
                db = await connectDB()
                institutions = await db.collection('institutions').find().toArray()
            } catch (error) {
            }
            return institutions
        },
        getInstitucion: async (root, { id }) => {
            let db
            let institution = []
    
            try {
                db = await connectDB()
                institution = await db.collection('institutions').findOne({ _id: ObjectID(id) })
            } catch (error) {
            }
            return institution
        },
        getCalendars: async () => {
            let db
            let calendars = []
    
            try {
                db = await connectDB()
                calendars = await db.collection('calendars').find().toArray()
            } catch (error) {
            }
            return calendars
        },
        getCalendar: async (root, { id }) => {
            let db
            let calendar = []
    
            try {
                db = await connectDB()
                calendar = await db.collection('calendars').findOne({ _id: ObjectID(id) })
            } catch (error) {
            }
            return calendar
        },
        getConsultations: async () => {
            let db
            let consultations = []
    
            try {
                db = await connectDB()
                consultations = await db.collection('consultations').find().toArray()
            } catch (error) {
            }
            return consultations
        },
        getConsultation: async (root, { id }) => {
            let db
            let consultation = []
    
            try {
                db = await connectDB()
                consultation = await db.collection('consultations').findOne({ _id: ObjectID(id) })
            } catch (error) {
            }
            return consultation
        },

        getRelationCalendar: async () => {
            let db
            let relation_calendar = []
    
            try {
                db = await connectDB()
                relation_calendar = await db.collection('relation_calendar').find().toArray()
            } catch (error) {
            }
            return relation_calendar
        },
    },
    Mutation: 
    {
        auth: async (root,{identifier,password}) =>{
            let db
            let professional = null
            let userToLogin = []
    
                
            try {
                db = await connectDB()
                professional = await db.collection('professionals').findOne({ identifier })
                if (!professional) {
                    professional = await db.collection('professionals').findOne({ email: identifier })
                }
            } catch (error) {
            }

            if (!professional) {
                throw new Error('El usuario ingresado no existe o es incorrecto.');
            } else {
                userToLogin = {
                    _id: professional._id,
                    email: professional.email,
                    firstName: professional.firstName,
                    lastName: professional.lastName,
                    profile: professional.profile,
                    matricula: professional.matricula,
                    phoneNumber: professional.phoneNumber,
                    identifier: professional.identifier
                            }
            }
            const pass= await bcrypt.compare(password, professional.password)
            if (!pass) {
                throw new Error('La contraseña ingresada es incorrecta.');
            }

            return newToken(userToLogin, process.env.SECRET, '1hr')

        },

        createProfessional: async (root, { input }) => {
            let db 
            let professional

            const {password} = input
            const salt = await bcrypt.genSalt(10)
            input.password= await bcrypt.hash(password,salt)

            const newProfe = ({
                ...input,
                createdOn: new Date(),
                modifiedOn: new Date()
            })

            try {
                db = await connectDB()
                
                professional = await db.collection('professionals').insertOne(newProfe)
                input._id = professional.insertedId
            } catch (error) {
                console.error(error)
            }
            return input
        },
        editProfessional: async (root, { _id, input }) => {
            let db 
            let professional
            try {
                db = await connectDB()
                await db.collection('professionals').updateOne({ _id: ObjectID(_id)},{ $set: input })
                professional = await db.collection('professionals').findOne({ _id: ObjectID(_id) })
            } catch (error) {
                console.error(error)
            }
            return professional
        },
        createPatient: async (root, { input }) => {
            let db 
            let patient

            const newPacient = ({
                ...input,
                createdOn: new Date(),
                modifiedOn: new Date()
            })

            try {
                db = await connectDB()
                patient = await db.collection('patients').insertOne(newPacient)
                input._id = patient.insertedId
            } catch (error) {
                console.error(error)
            }
            return input
        },
        editPatient: async (root, { _id, input }) => {
            let db 
            let patient
            try {
                db = await connectDB()
                await db.collection('patients').updateOne({ _id: ObjectID(_id)},{ $set: input })
                patient = await db.collection('patients').findOne({ _id: ObjectID(_id) })
            } catch (error) {
                console.error(error)
            }
            return patient
        },
        createInstitucion: async (root, { input }) => {
            let db 
            let institution

            const newPInst = ({
                ...input,
                createdOn: new Date(),
                modifiedOn: new Date()
            })

            try {
                db = await connectDB()
                institution = await db.collection('institutions').insertOne(newPInst)
                input._id = institution.insertedId
            } catch (error) {
                console.error(error)
            }
            return input
        },
        editInstitucion: async (root, { _id, input }) => {
            let db 
            let institution
            try {
                db = await connectDB()
                await db.collection('institutions').updateOne({ _id: ObjectID(_id)},{ $set: input })
                institution = await db.collection('institutions').findOne({ _id: ObjectID(_id) })
            } catch (error) {
                console.error(error)
            }
            return institution
        },
        createCalendar: async (root, { input }) => {
            let db 
            let calendar

            const newCal = ({
                ...input,
                createdOn: new Date(),
                modifiedOn: new Date()
            })

            try {
                db = await connectDB()
                calendar = await db.collection('calendars').insertOne(newCal)
                input._id = calendar.insertedId
            } catch (error) {
                console.error(error)
            }
            return input
        },
        editCalendar: async (root, { _id, input }) => {
            let db 
            let calendar
            try {
                db = await connectDB()
                await db.collection('calendars').updateOne({ _id: ObjectID(_id)},{ $set: input })
                calendar = await db.collection('calendars').findOne({ _id: ObjectID(_id) })
            } catch (error) {
                console.error(error)
            }
            return calendar
        },
        createConsultation: async (root, { input }) => {
            let db 
            let consultation

            const newCon = ({
                ...input,
                createdOn: new Date(),
                modifiedOn: new Date()
            })

            try {
                db = await connectDB()
                consultation = await db.collection('consultations').insertOne(newCon)
                input._id = consultation.insertedId
            } catch (error) {
                console.error(error)
            }
            return input
        },
        editConsultation: async (root, { _id, input }) => {
            let db 
            let consultation
            try {
                db = await connectDB()
                await db.collection('consultations').updateOne({ _id: ObjectID(_id)},{ $set: input })
                consultation = await db.collection('consultations').findOne({ _id: ObjectID(_id) })
            } catch (error) {
                console.error(error)
            }
            return consultation
        },

        createRelationCalendar: async (root, { professionalID, calendarID, institutionID }) => {
            let db 
            let insertedIds
            let professional
            let consultation
            const newCon = ({
                calendar: [calendarID],
                institution: [institutionID],
                createdOn: new Date(),
                modifiedOn: new Date()
            })
            try {
                db = await connectDB()
                consultation = await db.collection('relation_calendar').insertOne(newCon)
                insertedIds = consultation.insertedId
            } catch (error) {
                console.error(error)
            }

            try {
                professional = await db.collection('professionals').findOne({ _id: ObjectID(professionalID) })
                if (!professional || !insertedIds ) throw new Error(`El professionals o la relación no existe`)
                await db.collection('professionals').updateOne(
                { _id: ObjectID(professionalID) },
                { $addToSet: {relationCalendar: ObjectID(insertedIds) } }
                )
            } catch (error) {
                console.error(error)
            }
    
            return professional

        },

    },
    ...types
}
