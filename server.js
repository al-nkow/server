const express = require('express');
const connectDb = require('./config/db');

const app = express();

// Connect Database
connectDb();

// Init Middleware
app.use(express.json({ extended: false })); // body parser (req.body)

app.get('/', (req, res) => {
  res.send('API Running');
});

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=== SERVER STARTED ON PORT ${PORT} ===`);
  console.log(`=== Open: http://localhost:${PORT} ===`);
});

// mongoose.connect('mongodb://localhost:27017/myapi', { // proka4
//   // useMongoClient: true
// }).catch(err => {
//   if (err.message.indexOf("ECONNREFUSED") !== -1) {
//     console.error("Error: The server was not able to reach MongoDB. Maybe it's not running?");
//     process.exit(1);
//   } else {
//     throw err;
//   }
// });

// var address = process.env.MONGO_PORT_27017_TCP_ADDR || '127.0.0.1';
// var port = process.env.MONGO_PORT_27017_TCP_PORT || '27017';
// var dbName = process.env.MONGO_DATABASE_NAME || 'hrbase';
//
// // Build the connection string
// var dbURI = `mongodb://${address}:${port}/${dbName}`;
//
// // Create the database connection
// var connection = mongoose.createConnection(dbURI);
