import * as core from '@actions/core';
import { SlsCli } from './slsCli';
import { SlsOptions } from './slsOptions';
import { CredentialParser } from './CredentialParser';
import { InitializeServerless } from './initializeServerless';

async function run() {
  try {
    const version = require('../package.json').version;
    console.log(`Running serverless action v${version}...`);

    const yamlFile = core.getInput('yamlFile');
    core.debug(`yamlFile=${yamlFile}`);

    const creds = core.getInput('credentials', { required: true });

    const slsOptions: SlsOptions = {
      command: 'version',
      yamlFile: yamlFile,
      credentials: creds,
    }

    const credentialParser = new CredentialParser(creds);
    credentialParser.setLoginVariables();

    InitializeServerless.run();
    
    const output = await SlsCli.run(slsOptions);
    console.log(`serverless stdout:\n\n${output.stdout}`);

    if (output.stderr) {
      core.setFailed(output.stderr);
    }

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
