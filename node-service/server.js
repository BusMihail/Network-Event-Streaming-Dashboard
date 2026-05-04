require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const app = require('./src/app');
const { connectProducer } = require('./src/services/kafkaProducer');

const PORT     = process.env.PORT      || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/network_events';

async function start() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  connectProducer().catch((err) =>
    console.warn('Kafka unavailable, events will not be published:', err.message)
  );

  app.listen(PORT, () => console.log(`node-service on port ${PORT}`));
}

start().catch((err) => {
  console.error('Startup failed:', err);
  process.exit(1);
});