import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
try {
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/compatibility', require('./routes/compatibility'));
} catch (e) {
  console.warn('Auth or compatibility route not found. Skipping /api/auth or /api/compatibility.');
}
// Add other routes as needed
// app.use('/api/other', require('./routes/other'));

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Serve static files (if needed)
// app.use(express.static(path.join(__dirname, 'public')));

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});