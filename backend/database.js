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

// Seed initial data (only run in development or on first setup)
// if (process.env.NODE_ENV !== 'production') {
//   const Job = require('./src/models/Job');
//   db.once('open', async () => {
//     try {
//       await Job.deleteMany({});
//       await Job.insertMany([
//         {
//           title: 'Software Engineer',
//           company: 'Tech Corp',
//           location: 'Remote',
//           description: 'Develop and maintain web applications.',
//         },
//         {
//           title: 'Product Manager',
//           company: 'Innovate Inc',
//           location: 'San Francisco, CA',
//           description: 'Lead product development teams.',
//         },
//       ]);
//       console.log('Initial jobs seeded');
//     } catch (err) {
//       console.error('Error seeding data:', err);
//     }
//   });
// }

module.exports = mongoose;