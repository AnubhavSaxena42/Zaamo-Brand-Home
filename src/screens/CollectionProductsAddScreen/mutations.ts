import {gql} from '@apollo/client';

export const COLLECTION_CREATE = gql`
  mutation collectionCreate(
    $name: String!
    $imageUrl: String!
    $products: [ID]
  ) {
    collectionCreate(
      input: {
        name: $name
        imageUrl: $imageUrl
        isPublished: true
        products: $products
      }
    ) {
      collection {
        id
        name
        descriptionJson
        slug
        imageUrl
        isPublished
      }
    }
  }
`;
