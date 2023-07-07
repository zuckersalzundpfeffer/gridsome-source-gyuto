/**
 * Gridsome Source Plugin for ZSP Gyuto
 */

const gyuto = require("./gyuto");
// const baseFragments = require("./graphql/fragments/PageFragment");

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
      queryFragments: "",
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
      queryFragments: options.queryFragments,
      api,
      options,
    });

    this.api = api;
    this.options = options;
    this.typesIndex = {};
    this.client = client;
    this.config = {};

    if (this.getApiVersion() === "graphql") {
      api.loadSource(async (store) => {
        store.addMetadata("message", "This is a global text");
      });
      api.createManagedPages(async ({ graphql, createPage }) => {
        // Query our local GraphQL schema to get all sections
        // const createFragments = (fragments) => {
        //   let fragmentString = "";
        //   const namespacedFragment = fragments.replaceAll(" on ", " on gyutoTypes_");
        //   fragmentString += namespacedFragment;

        //   return fragmentString;
        // };
        const queryFragments = this.options.queryFragments.replaceAll(" on ", " on gyutoTypes_");
        // const pageFragment = baseFragments;
        // console.log(queryFragments);
        //   const defaultQuery = `
        //   query {
        //     ${this.options.fieldName} {
        //       config {
        //         site {
        //           rootPage{
        //             id
        //           }
        //           pages{
        //             id
        //             ...pageFragment
        //           }
        //         }
        //       }
        //     }
        //   }
        //   ${pageFragment}
        // `;

        let site = null;

        try {
          const { data } = await graphql(queryFragments);
          if (data.errors) {
            console.error(data.errors);
          } else {
            site = data[this.options.fieldName].config.site;
          }
        } catch (error) {
          console.error(error);
        }

        const { ressources } = this.options;
        const pageRessource = ressources.find((res) => res.endpoint === "pages");

        site.pages.forEach((page) => {
          let pageTemplate = null;
          if (Array.isArray(pageRessource.pageTemplates)) {
            pageTemplate = pageRessource.pageTemplates.find((template) => template.pageType === page.pageType);
          } else {
            pageTemplate = ressources.find((res) => res.pageTemplate.pageType === page.pageType).pageTemplate;
          }

          if (pageTemplate) {
            // Only create pages if we have a dedicated pageTemplate and Path
            const pathArray = pageTemplate.path.split(":");
            const pageId = pageTemplate.indexProp ? page[pageTemplate.indexProp] : page.id;
            console.log(pageTemplate, pageId, page.id);

            createPage({
              path: `${pathArray[0]}${pageId}`,
              component: pageTemplate.component,
              context: {
                ...page,
                id: parseInt(page.id, 10),
                slug: page.slug,
                title: page.title,
                pageType: page.pageType,
                rootPageId: parseInt(site.rootPage.id, 10),
              },
            });
          }
        });
      });
    }
  }

  getApiVersion() {
    const versions = {
      REST: "api",
      rest: "api",
      graphql: "graphql",
    };
    const version = this.options.version ? this.options.version : "api";
    return versions[version];
  }

  // getApiRevision(revision) {
  //   const revisions = {
  //     v02: "v2",
  //   };
  //   return revisions[revision] ? revisions[revision] : "v2";
  // }
}

module.exports = GyutoSource;
