import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';

export const createClusterContainer = (
  image = 'redislabs/client-libs-test:8.0.0'
): Promise<StartedTestContainer> => {
  return new GenericContainer(image)
    .withEnvironment({
      REDIS_CLUSTER: 'yes'
    })
    .withExposedPorts(
      { container: 3000, host: 3000 },
      { container: 3001, host: 3001 },
      { container: 3002, host: 3002 }
    )
    .withWaitStrategy(Wait.forLogMessage('Cluster created'))
    .start();
};
