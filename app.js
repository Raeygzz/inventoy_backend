const express = require('express');
const app = express();

const db = require('./src/config/database/db');

// Database Connection
db.on('error', error => console.error('Error ==> ', error))
db.once('open', () => console.log('Connected To Database(MongoDB)'))

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Homepage Route
app.get('/', (req, res) =>
  res.send('Hi Hello World')
);

// Users API Routes
app.use('/api/users', require('./src/routes/api/users'));
app.use('/api/client', require('./src/routes/api/client'));
app.use('/api/product', require('./src/routes/api/product'));
app.use('/api/orderRecord', require('./src/routes/api/orderRecord'));

// 404 not found route
app.get('/**', (req, res) => {
  res.send('<h1>404 Not Found</h1>')
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
