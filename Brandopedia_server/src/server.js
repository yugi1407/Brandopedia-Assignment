
require('dotenv').config();

const app = require('./app');
const connectDatabase = require('./config/database');

const PORT = Number(process.env.PORT || 5000);

async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`API server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
}

startServer();
