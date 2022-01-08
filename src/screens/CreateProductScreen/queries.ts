import {gql} from '@apollo/client';

export const GET_PRODUCT_TYPES = gql`
  query {
    productTypes(first: 10) {
      edges {
        node {
          id
          name
          variantAttributes {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_SIZE_VALUES = gql`
  query {
    attributes(first: 100, filter: {search: "size"}) {
      edges {
        node {
          id
          name
          valueRequired
          values {
            id
            name
          }
        }
      }
    }
  }
`;
