import mongoose from 'mongoose';

module.exports = async function () {
  console.log('Tearing down MongoDB Testcontainers...');

  await mongoose.disconnect();
  globalThis.container.stop();
};
