import { gql } from "@apollo/client";

export const RichTextBlockComponent = gql`
  fragment RichTextBlockComponent on RichTextBlock {
    value
  }
`;
