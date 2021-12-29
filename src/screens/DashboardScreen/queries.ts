import {gql} from '@apollo/client';

export const GET_STORE = gql`
  query {
    store(storeId: "10") {
      __typename
      storeName
      id
      storeType
      defaultCollection {
        id
        name
        imageUrl
        products(first: 10) {
          edges {
            node {
              id
            }
          }
        }
      }
      collections(first: 10) {
        edges {
          node {
            id
            name
            imageUrl
            products(first: 10) {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
