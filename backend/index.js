const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./database');
const jobRoutes = require('./src/routes/jobs');
const applicationRoutes = require('./src/routes/applications');
const authRoutes = require('./src/routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));