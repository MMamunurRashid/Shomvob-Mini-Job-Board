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

//   // Helper to get date string N days from now
//   const getFutureDate = (daysFromNow) => {
//     const date = new Date();
//     date.setDate(date.getDate() + daysFromNow);
//     return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
//   };

//   db.once('open', async () => {
//     try {
//       await Job.deleteMany({});
//       await Job.insertMany([
//         {
//           title: 'Frontend Developer',
//           companyName: 'PixelWave',
//           companyDetails: 'Creative design agency specializing in UI/UX solutions.',
//           location: 'Dhaka, Bangladesh',
//           salary: '50,000 BDT/month',
//           jobType: 'Onsite',
//           experience: '1+ years',
//           description: 'Looking for a React developer to join our creative team.',
//           deadline: getFutureDate(15),
//         },
//         {
//           title: 'Backend Developer (Node.js)',
//           companyName: 'CodeNest Ltd.',
//           companyDetails: 'Tech company focusing on scalable cloud applications.',
//           location: 'Remote',
//           salary: '70,000 BDT/month',
//           jobType: 'Remote',
//           experience: '2+ years',
//           description: 'Responsible for REST API development and DB design.',
//           deadline: getFutureDate(20),
//         },
//         {
//           title: 'Product Manager',
//           companyName: 'InnovaTech',
//           companyDetails: 'Product-focused startup in fintech sector.',
//           location: 'Hybrid - Dhaka & Remote',
//           salary: '1,20,000 BDT/month',
//           jobType: 'Hybrid',
//           experience: '3+ years',
//           description: 'Lead the product lifecycle from concept to launch.',
//           deadline: getFutureDate(10),
//         },
//       ]);
//       console.log('✅ Initial jobs seeded');
//     } catch (err) {
//       console.error('❌ Error seeding data:', err);
//     }
//   });
// }


module.exports = mongoose;