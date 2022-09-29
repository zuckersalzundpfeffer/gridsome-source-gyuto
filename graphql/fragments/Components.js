const imageBlockComponent = `
fragment imageBlockComponent on gyutoTypes_ImageChooserBlock {
  image{
    id
    file
  }
}
`;

const richTextComponent = `
fragment richTextComponent on gyutoTypes_RichTextBlock {
  value
}
`;
const codeBlockComponent = `
fragment codeBlockComponent on gyutoTypes_CodeBlock {
  title
  syntax
  body
}
`;
const componentsRegistry = `
${richTextComponent}
${codeBlockComponent}
${imageBlockComponent} 
`;
const componentsList = `
...richTextComponent
...codeBlockComponent
...imageBlockComponent
`;
const combinedComponents = `
components {
  id
  field
  blockType
  ${componentsList}
}
`;
const pageComponentsFragment = `
fragment componentsPage on gyutoTypes_ComponentPage {
  id
  ${combinedComponents}
}
fragment zspBasePage on gyutoTypes_ZspBasePage {
  id
  ${combinedComponents}
}
fragment zspStaticPage on gyutoTypes_ZspStaticPage {
  id
  ${combinedComponents}
}
fragment zspComponentsPage on gyutoTypes_ZspComponentsPage {
  id
  ${combinedComponents}
}
fragment zspReferencePage on gyutoTypes_ZspReferencePage {
  id
  ${combinedComponents}
}
${componentsRegistry}       
`;

module.exports = pageComponentsFragment;
