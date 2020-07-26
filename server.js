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

// bodyParser 
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  // Allow CORS
  res.header('Access-Control-Allow-Origin', '*');
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

// response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/shops', require('./routes/api/shops'));
app.use('/api/categories', require('./routes/api/categories'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/positions', require('./routes/api/positions'));
app.use('/api/import', require('./routes/api/import'));
app.use('/api/me', require('./routes/api/me'));
app.use('/api/wholesale', require('./routes/api/wholesale'));
app.use('/api/supply', require('./routes/api/supply'));
app.use('/api/cooperations', require('./routes/api/cooperations'));
app.use('/api/rent', require('./routes/api/rent'));
app.use('/', require('./routes/static/static'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=== SERVER STARTED ON PORT ${PORT} ===`);
  console.log(`=== Open: http://localhost:${PORT} ===`);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
