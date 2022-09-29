/**
 * Gyuto API Client
 */
const GraphQLSource = require("@gridsome/source-graphql");

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
    gyutoApiEndpoints = [],
    api,
    options
  ) {
    this.gyutoSite = gyutoSite;
    this.gyutoSiteKey = gyutoSiteKey;
    this.gyutoApiBase = gyutoApiBase;
    this.gyutoApiVersion = gyutoApiVersion;
    this.gyutoApiType = gyutoApiType;
    this.gyutoApiEndpoints = gyutoApiEndpoints;
    this.api = api;
    this.options = options;
    this.apiClient = this._createClient();
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
    if (this.gyutoApiType === "graphql") {
      const graphQlOptions = this.options;

      graphQlOptions.url = `${this.gyutoApiBase}/api/graphql/`;
      graphQlOptions.fieldName = "gyuto";
      graphQlOptions.typeName = "gyutoTypes";
      graphQlOptions.headers = {
        "gyuto-key": this.gyutoSiteKey,
        "gyuto-site": this.gyutoSite,
      };

      return new GraphQLSource(this.api, graphQlOptions);
    }
  }
  get client() {
    return this.apiClient;
  }
}

module.exports = function ({ site, accessToken, host, version, revision, ressources, api, options }) {
  return new GyutoSite(site, accessToken, host, version, revision, ressources, api, options);
};
