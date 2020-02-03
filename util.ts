import { AxiosResponse } from 'axios';

const isDebugEnabled: boolean = false;

export default {
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
