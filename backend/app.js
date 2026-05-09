const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger/swaggerConfig');
const passport = require('passport');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/message', require('./routes/message'));
app.use('/api/match', require('./routes/match'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/search', require('./routes/search'));
app.use('/api/subscription', require('./routes/subscription'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the existing backend process or set a different PORT in backend/.env.`);
    process.exit(1);
  }

  console.error('Server failed to start:', error);
  process.exit(1);
});
