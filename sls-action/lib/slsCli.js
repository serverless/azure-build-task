"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const exec = __importStar(require("@actions/exec"));
class SlsCli {
    static run(slsOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: sniff test params; possibly put isValid method on SlsOptions
            let output = '';
            let errOutput = '';
            const execOptions = {
                listeners: {
                    stdout: (data) => {
                        output += data.toString();
                    },
                    stderr: (data) => {
                        errOutput += data.toString();
                    }
                }
            };
            yield exec.exec("npx", ["sls", slsOptions.command], execOptions);
            return {
                stdout: output,
                stderr: errOutput
            };
        });
    }
}
exports.SlsCli = SlsCli;
