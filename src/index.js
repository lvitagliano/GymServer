const express = require('express');
const morgan  = require('morgan');
const cors  = require('cors');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config();
const { makeExecutableSchema } = require('graphql-tools');
const { readFileSync } = require('fs');
const { join } = require('path');
const resolvers = require('./data/resolvers')
const PORT = process.env.PORT || 3000;


//INICIALIZATIONS
const app = express();
app.use(morgan('dev'));
app.set('port', PORT);
const isDev = process.env.NODE_ENV !== 'production'

const typeDefs = readFileSync(join(__dirname, 'data', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({typeDefs, resolvers});

app.use(cors())

//routes
app.use(
    '/api',
    graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
    }),
  );

app.listen(app.get('port'), () => {
    console.log(`Running API server at http://localhost:${PORT}/api`);
})