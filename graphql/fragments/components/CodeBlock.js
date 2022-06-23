import { gql } from "@apollo/client";

export const CodeBlockComponent = gql`
  fragment CodeBlockComponent on CodeBlock {
    title
    syntax
    body
  }
`;
