/*
 * Searches NPM packages by search term using the npms.io API.
 *
 * @see: https://api-docs.npms.io/
 * 
 * See the API docs to understand the below specified search result types.
 * 
 * @author: jforge
 */
import axios from 'axios';

const limit: number = 250;
const host: string = 'https://api.npms.io';
const path: string = '/v2/search'

export interface PackageSearchResponse {
  total: number
  results: Array<NpmsIoSearchResult>
}

export interface NpmsIoSearchResult {
  package: NpmsIoPackage
  searchScore: number
}

export interface NpmsIoPackage {
  name: string,
  scope: string,
  version: string,
  description: string,
  date: Date
}

export default {
  search: async function <PackageSearchResponse>(searchTerm: string) {
    // @ts-ignore
    return axios.get<PackageSearchResponse>(`${host}${path}`, {
      params: {
        size: limit,
        q: searchTerm
      }
    });
  }
}
