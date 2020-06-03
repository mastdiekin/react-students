import axios from "axios";

if (process.env.APP_ENV == "local") {
  axios.defaults.baseURL = process.env.API_DEV_URL;
} else {
  axios.defaults.baseURL = process.env.API_URL;
}
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.post["Content-Type"] = "application/json";

/**
 * Set Authorization header for requests
 *
 * @param {string} url The URL we want to request
 * @param {object} [options] The options we want to pass to "fetch"
 * @return {object} An object containing either "data" or "err"
 */
function setAuthToken(token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param {string} url The URL we want to request
 * @param {object} [options] The options we want to pass to "fetch"
 * @return {object} An object containing either "data" or "err"
 */
function request(options) {
  return axios(options)
    .then((response) => response)
    .catch((err) => {
      const error = err.response;
      const errMessage = ((error || {}).data || {}).message || "";
      const errStatus = (error || {}).status || "";
      const statusText = (error || {}).statusText || "";

      const message = `Error status ${errStatus} Message: ${errMessage}`;
      console.log(error);
      return Promise.reject(errMessage || `${errStatus}: ${statusText}`);
    });
}

export { request, setAuthToken };
