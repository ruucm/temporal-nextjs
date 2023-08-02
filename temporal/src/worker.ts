import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities';

run().catch((err) => console.log(err));

async function run() {
  const connection = await NativeConnection.connect({ address: 'temporal-l6zx:7233' });

  const worker = await Worker.create({
    connection,
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'ecommerce-oneclick',
  });

  // Start accepting tasks on the `tutorial` queue
  await worker.run();
}
