import {gql} from '@apollo/client';
export const UPDATE_COLLECTION = gql`
  mutation collectionUpdate($id: ID!, $input: CollectionInput!) {
    collectionUpdate(id: $id, input: $input) {
      collection {
        id
        imageUrl
        name
      }
    }
  }
`;
