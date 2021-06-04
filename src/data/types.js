'use strict'
const {GraphQLDateTime} = require('graphql-iso-date');
const connectDB = require('../database');
const { ObjectID } = require('mongodb');

module.exports = {
    Date: GraphQLDateTime,

    User: {
        __resolveType: (user, context, info) => {
            if (user.matricula) {
                return 'Professional'
            }
            if (user.nac) {
                return 'Patient'
            }
        }
    },

    Professional: {      
        institution: async ({ institution }) => {
            let db
            let institutionData
            let ids

            try {
                db = await connectDB()
                ids = institution ? institution.map(id => ObjectID(id)) : []
                institutionData = ids.length > 0 
                ? await  db.collection('institutions').find(
                    { _id: { $in: ids } }
                ).toArray()
                : []

            } catch (error) {
                console.error(error)
            }

            return institutionData
        },
        calendar: async ({ calendar }) => {
            let db
            let calendarData
            let ids

            try {
                db = await connectDB()
                ids = calendar ? calendar.map(id => ObjectID(id)) : []
                calendarData = ids.length > 0 
                ? await  db.collection('calendars').find(
                    { _id: { $in: ids } }
                ).toArray()
                : []

            } catch (error) {
                console.error(error)
            }

            return calendarData
        },
        relationCalendar: async ({ relationCalendar }) => {
            let db
            let relationCalendarData
            let ids

            try {
                db = await connectDB()
                ids = relationCalendar ? relationCalendar.map(id => ObjectID(id)) : []
                relationCalendarData = ids.length > 0 
                ? await  db.collection('relation_calendar').find(
                    { _id: { $in: ids } }
                ).toArray()
                : []

            } catch (error) {
                console.error(error)
            }

            return relationCalendarData
        }
    },

    Consultation: {      
        professional: async ({ professional }) => {
            let db
            let professionalnData
            let ids

            try {
                db = await connectDB()
                ids = professional ? professional.map(id => ObjectID(id)) : []
                professionalnData = ids.length > 0 
                ? await  db.collection('professionals').find(
                    { _id: { $in: ids } }
                ).toArray()
                : []

            } catch (error) {
                console.error(error)
            }

            return professionalnData
        },
        patient: async ({ patient }) => {
            let db
            let patientData
            let ids

            try {
                db = await connectDB()
                ids = patient ? patient.map(id => ObjectID(id)) : []
                patientData = ids.length > 0 
                ? await  db.collection('patients').find(
                    { _id: { $in: ids } }
                ).toArray()
                : []

            } catch (error) {
                console.error(error)
            }

            return patientData
        }
    },

    RelationCalendar: {      
        calendar: async ({ calendar }) => {
            let db
            let calendarData
            let ids

            try {
                db = await connectDB()
                ids = calendar ? calendar.map(id => ObjectID(id)) : []
                calendarData = ids.length > 0 
                ? await  db.collection('calendars').find(
                    { _id: { $in: ids } }
                ).toArray()
                : []

            } catch (error) {
                console.error(error)
            }

            return calendarData
        }, 
        institution: async ({ institution }) => {
            let db
            let institutionData
            let ids

            try {
                db = await connectDB()
                ids = institution ? institution.map(id => ObjectID(id)) : []
                institutionData = ids.length > 0 
                ? await  db.collection('institutions').find(
                    { _id: { $in: ids } }
                ).toArray()
                : []

            } catch (error) {
                console.error(error)
            }

            return institutionData
        }
    },
}