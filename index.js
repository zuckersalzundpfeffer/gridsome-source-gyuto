/**
 * Gridsome Source Plugin for ZSP Gyuto
 */

const gyuto = require("./gyuto");
class GyutoSource {
  static defaultOptions() {
    return {
      site: undefined,
      accessToken: undefined,
      environment: "main",
      host: undefined,
      mediaHost: undefined,
      typeName: "GyutoType",
      fieldName: "gyuto",
    };
  }

  constructor(api, options) {
    const { client } = gyuto({
      site: options.site,
      accessToken: options.accessToken,
      host: options.host,
      version: options.version,
      revision: options.revision,
      ressources: options.ressources,
      api,
      options,
    });

    this.api = api;
    this.options = options;
    this.typesIndex = {};
    this.client = client;
    this.config = {};
    console.log("version", this.options.version);

    if (this._getApiVersion(this.options.version) === "graphql") {
      api.createPages(async ({ graphql, createPage }) => {
        const pageFragment = require("./graphql/fragments/PageFragment.js");
        // Query our local GraphQL schema to get all sections
        console.log(graphql);
        const {
          data: {
            gyuto: {
              config: { site },
            },
          },
        } = await graphql(`
             query {
               ${this.options.fieldName} {
                 config {
                   site {
                     rootPage{
                       id
                     }
                     pages{
                       id
                       ...pageFragment
                     }
                   }
                 }
               }         
             }
             ${pageFragment}
           `);

        const ressources = this.options.ressources;
        site.pages.forEach((page) => {
          const pageRessource = ressources.find((res) => res.endpoint === "pages");
          const pageTemplate = pageRessource.pageTemplates.find((template) => template.pageType === page.pageType);
          console.log(pageTemplate);
          if (pageTemplate) {
            // Only create pages if we have a dedicated pageTemplate and Path
            const pathArray = pageTemplate.path.split(":");
            const pageId = pageTemplate.indexProp ? page[pageTemplate.indexProp] : page.id;
            console.log(pageTemplate, pageId, page.id);

            createPage({
              path: `${pathArray[0]}${pageId}`,
              component: pageTemplate.component,
              context: {
                id: parseInt(page.id),
                slug: page.slug,
                title: page.title,
                pageType: page.pageType,
              },
            });
          }
        });
      });
    }
  }

  _getApiVersion(version) {
    const versions = {
      REST: "api",
      rest: "api",
      graphql: "graphql",
    };
    return versions[version] ? versions[version] : "api";
  }
  _getApiRevision(revision) {
    const revisions = {
      v02: "v2",
    };
    return revisions[revision] ? revisions[revision] : "v2";
  }
}

module.exports = GyutoSource;
