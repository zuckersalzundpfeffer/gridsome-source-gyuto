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
const componentsFragment = `
fragment components on gyutoTypes_ComponentPage {
  id
  components {
    id
    field
    blockType
    ...richTextComponent
    ...codeBlockComponent
    ...imageBlockComponent
  }
}
${richTextComponent}
${codeBlockComponent}
${imageBlockComponent}        
`;

module.exports = componentsFragment;
