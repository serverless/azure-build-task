import * as core from '@actions/core';
import { SlsOptions } from './slsOptions';
import { execSync, IExecSyncResult } from './utility';

export class SlsCli {
  public static async run(slsOptions: SlsOptions) {
    throwIfError(execSync("npx", "--version"));
    const response = execSync("npx", `sls ${slsOptions.command}`);
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
