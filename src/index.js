const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const {resolvers} = require('./data/resolvers')
const {typeDefs} = require('./data/schema.js')
require('dotenv').config();

const PORT = process.env.PORT;


//INICIALIZATIONS
const app = express();
app.set('port', PORT);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });


// The GraphQL endpoint
app.use('/graphiql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphql', graphiqlExpress({ endpointURL: '/graphiql' }));

// Start the server
app.listen(3000, () => {
    console.log(`Running API server at http://localhost:${PORT}/graphql`);
});