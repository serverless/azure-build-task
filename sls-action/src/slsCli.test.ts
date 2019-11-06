import { SlsCli } from '../src/slsCli';
import { SlsOptions } from '../src/slsOptions';

test('sls cli can be invoked', async () => {
  jest.setTimeout(15000);
  const slsOptions: SlsOptions = {
    command: 'version',
    yamlFile: undefined,
    credentials: ''
  }

  const output = await SlsCli.run(slsOptions);
  expect(output.stdout).toBeTruthy();
  expect(output.stderr).not.toBeTruthy();
});
