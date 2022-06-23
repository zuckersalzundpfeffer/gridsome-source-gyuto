const components = require("./Components.js");

const componentPage = `
        fragment componentPage on gyutoTypes_ComponentPage {
          ...components
        }
        ${components}      
        `;

const pageFragment = `
        fragment pageFragment on gyutoTypes_PageInterface {
          id
          title
          slug
          contentType
          pageType
          ...componentPage
        }
        ${componentPage}
        `;

module.exports = pageFragment;
