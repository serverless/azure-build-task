import * as exec from '@actions/exec';
import { SlsOptions } from './slsOptions';

export class SlsCli {

  public static async run(slsOptions: SlsOptions) {
    // TODO: sniff test params; possibly put isValid method on SlsOptions

    let output: string = '';
    let errOutput: string ='';

    const execOptions = {
      listeners: {
        stdout: (data: Buffer) => {
          output += data.toString();
        },
        stderr: (data: Buffer) => {
          errOutput += data.toString();
        }
      }
    };

    await exec.exec("npx", ["sls", slsOptions.command], execOptions);
    return {
      stdout: output,
      stderr: errOutput
    }
  }
}
