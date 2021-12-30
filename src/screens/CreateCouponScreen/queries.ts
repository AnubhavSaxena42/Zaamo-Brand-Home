import {gql} from '@apollo/client';

export const GET_STORES = gql`
  query {
    stores(first: 100) {
      edges {
        node {
          id
          storeName
          storeUrl
          slug
        }
      }
    }
  }
`;
