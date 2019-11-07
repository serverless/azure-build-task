import { execSync, IExecSyncResult } from './utility';
import * as core from '@actions/core';

export class InitializeServerless {
    public static async run() {
      throwIfError(execSync("npm", "--version"));
      const response = execSync("npm", 'install serverless');
      core.info('Serverless framework installed');
      return response;
    }
  }

  function throwIfError(resultOfToolExecution: IExecSyncResult, errormsg?: string) {
    if (resultOfToolExecution.code != 0) {
        core.error("Error Code: [" + resultOfToolExecution.code + "]");
        if (errormsg) {
          core.error("Error: " + errormsg);
        }
        throw resultOfToolExecution;
    }
  }