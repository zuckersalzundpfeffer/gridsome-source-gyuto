const gyuto = require("./gyutoApi");
const camelCase = require("camelcase");

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
    
    const {client} = gyuto({
      site: options.site,
      accessToken: options.accessToken,
      host: options.host,
      version: options.apiVersion,
      revision: options.apiRevision,
      endpoints: options.endpoints,
    })

    this.api = api;
    this.options = options;
    this.typesIndex = {};
    this.client = client;

    api.loadSource( async store => {
      await this.createCollection(store, "pages");
    });
  }
    async createCollection(store, endpoint, collectionName = null) {
      const typeName = collectionName ? this.createTypeNameFor(collectionName) : this.createTypeNameFor(endpoint);
      const route = `${endpoint}/`
      const collection = store.addCollection({ typeName });
      const { meta, items } = await this.client.$get(route);
      for(const item of items){
        const node = await this.createCollectionNode(item)
        collection.addNode(node);
      }
    }
    async createCollectionNode(item){
      const node = await this.client.$get(`pages/${item.id}`);
      return node
    }
    // async getPages(actions) {
    //   const route = "pages";
    //   const { meta, items } = await this.client.$get(route);

    //   const typeName = this.createTypeNameFor(route);
      
    //   const collection = actions.addCollection({ typeName });
    //   for (const item of items) {
        
    //     const page = await this.getPageDetail(item);
    //     collection.addNode(page);
    //   }
    // }
  //   async getDocuments(actions) {
  //     const route = "pages";
  //     const { meta, items } = await this.client.$get(route);
  //     const typeName = this.createTypeName(this.options.typeName, route);
  //     const collection = actions.addCollection({ typeName });

  //     for (const item of items) {
  //       const page = await this.getPageDetail(item);
  //       collection.addNode(page);
  //     }
  //   }
  //   async getAssets(actions) {
  //     const route = "pages";
  //     const { meta, items } = await this.client.$get(route);
  //     const typeName = this.createTypeName(this.options.typeName, route);
  //     const collection = actions.addCollection({ typeName });

  //     for (const item of items) {
  //       const page = await this.getPageDetail(item);
  //       collection.addNode(page);
  //     }
  //   }
  //   async getImages(actions) {
  //     const route = "pages";
  //     const { meta, items } = await this.client.$get(route);
  //     const typeName = this.createTypeName(this.options.typeName, route);
  //     const collection = actions.addCollection({ typeName });

  //     for (const item of items) {
  //       const page = await this.getPageDetail(item);
  //       collection.addNode(page);
  //     }
  //   }
  //   async getCollection(actions) {
  //     const route = "pages";
  //     const { meta, items } = await this.client.$get(route);
  //     const typeName = this.createTypeName(this.options.typeName, route);
  //     const collection = actions.addCollection({ typeName });

  //     for (const item of items) {
  //       const page = await this.getPageDetail(item);
  //       collection.addNode(page);
  //     }
  //   }
    async getPageDetail({ id }) {
      const page = await this.client.$get(`pages/${id}`);
      return page;
    }

    createTypeNameFor(route = "") {
      return camelCase(`${this.options.typeName} ${route}`, { pascalCase: true });
    }
    isReference(value) {
      return typeof value === "object" && typeof value.sys !== "undefined";
    }
}

module.exports = GyutoSource;
