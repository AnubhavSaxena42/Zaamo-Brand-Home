import {gql} from '@apollo/client';

export const GET_PRODUCT_TYPES = gql`
  query {
    productTypes(first: 10) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
