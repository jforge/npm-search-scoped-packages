/**
 * NPM search utility to find NPM package by scope name.
 * 
 * Uses the npms.io API for searching packages.
 * 
 * Designed as a CLI tool with different output formats
 * 
 * @author jforge
 */
import npmsApi from './search-npms-io';
import util from './util';
import { ToolParameter } from './util';
import { PackageSearchResponse, NpmsIoPackage, NpmsIoSearchResult } from './search-npms-io';
import { AxiosResponse, AxiosError } from 'axios';
import * as chalk from 'chalk';

class SearchApi {
  results: AxiosResponse;
  async search(term: string) {
    this.results = await npmsApi.search(term);
    return this.results;
  }
}

const param: ToolParameter = new ToolParameter();

const logger = util.configureLogger();
const program: Caporal = util.configureCli(logger, param);

program.parse(process.argv);

(async () => {
  logger.info(`\r\n${chalk.green('NPM Package search for:')} ${chalk.yellow(param.searchTerm)}\r\n`);

  const searchApi: SearchApi = new SearchApi();
  const response = await searchApi.search(param.searchTerm);

  await util.dumpResponseMetaData(response);
  const packageSearchResult: PackageSearchResponse = response.data;

  logger.info(`Number of packages found: ${chalk.yellow(packageSearchResult.total)}\r\n`);

  let processedResult: Array<string> = packageSearchResult.results
    .sort((a, b) => a.package.name.localeCompare(b.package.name))
    .map(item => `${item.package.name}@${item.package.version}`);

  if (param.outputFormat === 'npm') {
    let npmList: string = processedResult.join(' ');
    logger.info(`${npmList}`);
  } else {
    processedResult.forEach(item => logger.info(chalk.cyan(item)));
  }
})().catch(err => {
  if (err && err.response) {
    const axiosError = err as AxiosError<any>
    return axiosError.response.data;
  }
  throw err;
}).then(function () {
  logger.info(`\r\n${chalk.green('Package search finished.')}`);
})
