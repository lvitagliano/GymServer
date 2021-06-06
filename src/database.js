const MongoClient = require('mongodb').MongoClient
const {
    DB_USER,
    DB_PASSWD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env

const pass= 'Have%Ticket5'
//const URI = `mongodb://${DB_HOST}/${DB_NAME}`;
const uri = `mongodb+srv://root:${pass}@cluster0.ec63d.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

let connection




// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://root:<password>@cluster0.ec63d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



async function connectDB () {
    if (connection) return connection
    let client 
    try {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        connection = client.db(DB_NAME)
    } catch (error) {
        console.error('Could not connect to db', uri, error)
        process.exit(1)
    }
    return connection
}

module.exports = connectDB