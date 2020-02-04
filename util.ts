/**
 * Utilities for use with CLI tools and Axios functions.
 * 
 * Uses:
 * - axios as http client library
 * - winston as the logger implementation
 * - caporal as the cli application framework
 * 
 * @author jforge
 */

import { AxiosResponse } from 'axios';
import * as winston from 'winston';
import * as program from 'caporal';

export class ToolParameter {
  searchTerm: string;
  outputFormat?: string;
}

const isDebugEnabled: boolean = false;

export default {
  configureLogger: function () {
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.printf(({ level, message, label, timestamp }) => `${message}`),
      transports: [
        new winston.transports.Console()
      ]
    });
    return logger;
  },
  configureCli: function (logger: winston.Logger, param: ToolParameter) {
    program
      .logger(logger)
      .version('1.0.0')
      .description('NPM Package Search by scope')
      .name('npm-by-scope')
      .argument('<package_scope>', 'NPM package scope to search for', /^[a-zA-Z].*$/)
      .option('--format <outputformat>', 'formats the result for cli (default) or for installation use (npm)', /^cli|npm$/, 'cli', false)
      .action(function (args, options, logger) {
        param.searchTerm = `scope:${args.packageScope} not:unstable`;
        param.outputFormat = options.format;
        logger.debug("Options: " + JSON.stringify(options));
      });
    return program
  },
  dumpResponseMetaData: async function (response: AxiosResponse) {
    if (isDebugEnabled) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    }
  }
}
