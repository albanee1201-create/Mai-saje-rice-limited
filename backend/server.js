const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const winston = require('winston');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ==========================================
// Logging Configuration
// ==========================================
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// ==========================================
// Security Middleware
// ==========================================
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true,
  optionsSuccessStatus: 200
}));

// ==========================================
// Rate Limiting
// ==========================================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // limit login attempts
  skipSuccessfulRequests: true,
  message: 'Too many login attempts, please try again later.'
});

app.use('/api/', limiter);
app.use('/api/auth/login', authLimiter);

// ==========================================
// Body Parser Middleware
// ==========================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ==========================================
// Request Logging Middleware
// ==========================================
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// ==========================================
// Health Check Endpoint
// ==========================================
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// ==========================================
// API Routes (to be imported)
// ==========================================
// app.use('/api/v1/auth', require('./src/api/auth'));
// app.use('/api/v1/products', require('./src/api/products'));
// app.use('/api/v1/orders', require('./src/api/orders'));
// app.use('/api/v1/payments', require('./src/api/payments'));
// app.use('/api/v1/distributors', require('./src/api/distributors'));
// app.use('/api/v1/farmers', require('./src/api/farmers'));
// app.use('/api/v1/inventory', require('./src/api/inventory'));
// app.use('/api/v1/analytics', require('./src/api/analytics'));

// ==========================================
// 404 Handler
// ==========================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found'
    }
  });
});

// ==========================================
// Global Error Handler
// ==========================================
app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: message
    }
  });
});

// ==========================================
// Start Server
// ==========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🌍 Base URL: ${process.env.APP_URL || 'http://localhost:' + PORT}`);
});

module.exports = app;
