import axios from "axios";
import qs from "qs";

function createClient() {
  let backendAddress = (window as any)._BACKEND;

  if (backendAddress === "!!!API_PLACEHOLDER!!!") {
    backendAddress = undefined;
  }

  return axios.create({
    baseURL: backendAddress,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
    timeout: 10000,
  });
}

const client = createClient();

export default client;
