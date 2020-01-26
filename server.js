const express = require('express');
const connectDb = require('./config/db');
const addDefaultUser = require('./config/defaultAdmin');

const app = express();

// Connect Database
connectDb();

// Set default engine
app.set('views', './views');
app.set('view engine', 'pug');

// Create default admin account if not exists
addDefaultUser();

// static folder
app.use(express.static('static'));

// Init Middleware
app.use(express.json({ extended: false })); // body parser (req.body)

// TODO: разрешить только localhost или какой-то адрес
app.use((req, res, next) => {
  // Allow CORS
  res.header('Access-Control-Allow-Origin', '*'); // * - allow from any url
  // res.header('Access-Control-Allow-Origin', 'http://my-cool-page.com')
  // res.header('Access-Control-Allow-Headers', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token',
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, PATCH, DELETE, GET',
    );
    return res.status(200).json({});
  }
  next();
});

// app.get('/', (req, res) => {
//   res.send('API Running');
// });

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/shops', require('./routes/api/shops'));
app.use('/api/categories', require('./routes/api/categories'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/positions', require('./routes/api/positions'));
app.use('/api/import', require('./routes/api/import'));

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

// LANDING PAGE ======
app.get('/', async (req, res) => {
  // const content = await Content.findOne({ key: 'main_content' })
  //   .select('season main about programs benefits prizes teachers contacts');
  // const reviews = await Review.find().sort({ 'order': -1 });
  // const news = await News.find().sort({ 'date': -1 });
  // const faq = await Faq.find().select('_id answer question');
  // const partners = await Partners.find();
  // const docsList = await Doc.find();
  //
  // const docs = { policy: {}, offer: {}};
  // if (docsList) docsList.forEach(item => docs[item.name] = item);
  //
  // const data = { content, reviews, news, faq, partners, docs };
  // res.render('landing/index', data, function(err, html) {

  res.render('index', function(err, html) {
    res.send(html);
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  // if (req.accepts('json')) {
  //   res.send({ error: 'Not found' });
  //   return;
  // }

  // default to plain-text. send()
  // res.type('txt').send('Not found');

  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
