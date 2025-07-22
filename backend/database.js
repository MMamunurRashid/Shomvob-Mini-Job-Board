const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s if server is unreachable
  maxPoolSize: 10, // Maximum number of connections in the pool
  retryWrites: true, // Retry write operations on failure
  w: 'majority', // Write concern for consistency
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


module.exports = mongoose;