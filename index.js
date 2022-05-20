/**
 * Gridsome Source Plugin for ZSP Gyuto
 */

const gyuto = require("./gyuto");
const camelCase = require("camelcase");
const deepMerge = require("./helpers/deepMerge")

const flatMenuType = require("./types/flatMenuType");

class GyutoSource {
  static defaultOptions() {
    return {
      site: undefined,
      accessToken: undefined,
      environment: "main",
      host: undefined,
      mediaHost: undefined,
      typeName: "Gyuto",
    };
  }

  constructor(api, options) {
    const { client } = gyuto({
      site: options.site,
      accessToken: options.accessToken,
      host: options.host,
      version: options.apiVersion,
      revision: options.apiRevision,
      endpoints: options.endpoints,
    });

    this.api = api;
    this.options = options;
    this.typesIndex = {};
    this.client = client;
    this.config = {};

    api.loadSource(async (store) => {
      const { config, menus, site } = await this.client.$get("config/");
      await this.createCollection(store, menus, "menus");
      await this.createCollection(store, "pages");
      // Create other usefull Collections
      for (const endpoint of this.options.endpoints) {
        await this.createCollection(store, endpoint);
      }
    });
  }

  async createCollection(store, context, collectionName = null, schema = null) {
    const typeName = collectionName ? this._createTypeNameFor(collectionName) : this._createTypeNameFor(context);
    const collection = store.addCollection({ typeName });

    if (!Array.isArray(context)) {
      const route = `${context}/`;
      const { meta, items } = await this.client.$get(route);
      for (const item of items) {
        const node = await this.createCollectionNode(item);

        collection.addNode(schema ? this._mergeBySchema(node, schema) : node);
      }
    } else {
      for (const node of context) {
        collection.addNode(schema ? this._mergeBySchema(node, schema) : node);
      }
    }
  }
  async createCollectionNode({ meta: { detail_url } }) {
    const node = await this.client.$get(this._cleanUrl(detail_url));
    return node;
  }

  _createTypeNameFor(route = "") {
    return camelCase(`${this.options.typeName} ${route}`, { pascalCase: true });
  }
  _mergeBySchema(node, schema) {
    return deepMerge(node, schema);
  }
  _cleanUrl(detailUrl) {
    return detailUrl.replace(`${this.host}/${this.apiVersion}/${this.apiVersion}`);
  }
}

module.exports = GyutoSource;
