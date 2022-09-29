const components = require("./Components.js");

const pageFragment = `
        fragment pageFragment on gyutoTypes_PageInterface {
          id
          title
          slug
          contentType
          pageType
          ...componentsPage
          ...zspComponentsPage
          ...zspReferencePage
          ...zspStaticPage
          ...zspBasePage
        }
        ${components}
        `;

module.exports = pageFragment;
