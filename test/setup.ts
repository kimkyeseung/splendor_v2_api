import { GenericContainer, StartedTestContainer } from 'testcontainers';
import mongoose from 'mongoose';

module.exports = async () => {
  const container: StartedTestContainer = await new GenericContainer(
    'mongo:7.0',
  )
    .withExposedPorts(27017)
    .start();

  const host = container.getHost();
  const port = container.getMappedPort(27017);
  const uri = `mongodb://${host}:${port}/test_db`;

  globalThis.container = container;
  globalThis.dbUri = uri;

  console.log('Setting up MongoDB Testcontainers...', uri);

  await mongoose.connect(uri);
};
