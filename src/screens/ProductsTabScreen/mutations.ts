import {gql} from '@apollo/client';

export const COLLECTION_CREATE = gql`
  mutation collectionCreate($name: String!, $imageUrl: String!) {
    collectionCreate(
      input: {name: $name, imageUrl: $imageUrl, isPublished: true}
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
