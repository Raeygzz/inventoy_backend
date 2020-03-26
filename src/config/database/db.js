if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose');

// mongoose.set('useCreateIndex', true)
// mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DATABASE_URL, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

module.exports = db;
