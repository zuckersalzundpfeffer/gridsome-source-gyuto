/**
 * Gyuto API Client
 */

class RestClient {
  constructor(axios) {
    this.axios = axios;
  }
  async $get(url, params = {}) {
    const { data } = await this.axios.get(url, params);
    return data;
  }
  async $post(url, params = {}) {
    const { data } = await this.axios.post(url, params);
    return data;
  }
  async $put(url, params = {}) {
    const { data } = await this.axios.put(url, params);
    return data;
  }
  async $patch(url, params = {}) {
    const { data } = await this.axios.patch(url, params);
    return data;
  }
  async $delete(url, params = {}) {
    const { data } = await this.axios.delete(url, params);
    return data;
  }
}
class GyutoSite {
  constructor(
    gyutoSite = "",
    gyutoSiteKey = "",
    gyutoApiBase = "",
    gyutoApiType = "rest",
    gyutoApiVersion = "v2",
    gyutoApiEndpoints = []
  ) {
    this.gyutoSite = gyutoSite;
    this.gyutoSiteKey = gyutoSiteKey;
    this.gyutoApiBase = gyutoApiBase;
    this.gyutoApiVersion = gyutoApiVersion;
    this.gyutoApiType = gyutoApiType;
    this.apiClient = this._createClient();
    this.gyutoApiEndpoints = gyutoApiEndpoints;
  }
  getApiType(type) {
    const types = {
      rest: "api",
      graphql: "graphql",
    };
    return types[type];
  }
  getApiVersion(version = "v2") {
    const versions = {
      v2: "v2",
    };
    return versions[version];
  }
  _createClient() {
    const apiType = this.getApiType(this.gyutoApiType);
    const apiVersion = this.getApiVersion(this.gyutoApiVersion);
    if (this.gyutoApiType === "rest") {
      const axios = require("axios");
      axios.defaults.baseURL = `${this.gyutoApiBase}/${apiType}/${apiVersion}/`;
      axios.defaults.headers.common["gyuto-key"] = this.gyutoSiteKey;
      axios.defaults.headers.common["gyuto-site"] = this.gyutoSite;
      return new RestClient(axios);
    }
  }
  get client() {
    return this.apiClient;
  }
}

module.exports = function ({ site, accessToken, host, version, revision, ressources }) {
  return new GyutoSite(site, accessToken, host, version, revision, ressources);
};
