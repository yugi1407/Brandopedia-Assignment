
const express = require('express');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');

const userRoutes = require('./modules/users/user.routes');
const postRoutes = require('./modules/posts/post.routes');
const connectionRoutes = require('./modules/connections/connection.routes');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without a browser Origin header, such as local
      // scripts and native mobile apps. These requests are not authenticated
      // by CORS and still require proper authorization.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Origin not allowed by CORS'));
    },
  })
);

app.use(express.json({ limit: '100kb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many requests. Please try again later.' },
});

const connectionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    message: 'Too many connection requests. Please try again later.',
  },
});

app.use('/users', apiLimiter, userRoutes);
app.use('/posts', apiLimiter, postRoutes);
app.use('/connect', connectionLimiter, connectionRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error-handling middleware must remain after all routes.
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Request body too large' });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON body' });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: 'A duplicate record already exists',
    });
  }

  if (err.statusCode && err.statusCode >= 400 && err.statusCode < 500) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Avoid logging request bodies, tokens, or database credentials.
  console.error('Unhandled API error:', {
    message: err.message,
    method: req.method,
    path: req.path,
  });

  return res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
