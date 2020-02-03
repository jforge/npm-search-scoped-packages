import { AxiosResponse, AxiosError } from 'axios';
import npmsApi from './search-npms-io';
import util from './util';
import { PackageSearchResponse, NpmsIoPackage, NpmsIoSearchResult } from './search-npms-io';

export default class SearchApi {
  results: AxiosResponse;
  async search(term: string) {
    this.results = await npmsApi.search(term);
    return this.results;
  }
}

const searchApi: SearchApi = new SearchApi();
const searchTerm = "scope:aws-cdk not:unstable";

(async () => {
  console.log(`\r\nNPM Package search for: '${searchTerm}':\r\n`);

  const response = await searchApi.search(searchTerm);
  await util.dumpResponseMetaData(response);
  const packageSearchResult: PackageSearchResponse = response.data;

  console.log(`Total number of packages found: ${packageSearchResult.total}\r\n`);

  let sortedResult: Array<NpmsIoSearchResult> = packageSearchResult.results.sort((a, b) => a.package.name.localeCompare(b.package.name));
  sortedResult.forEach(item => {
    const npmsIoPackage: NpmsIoPackage = item.package;
    console.log(`${npmsIoPackage.name}:${npmsIoPackage.version}`);
  });
})().catch(err => {
  if (err && err.response) {
    const axiosError = err as AxiosError<any>
    return axiosError.response.data;
  }
  throw err;
}).then(function () {
  console.log('\r\nPackage search finished.');
})
