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
    attribute(id: "QXR0cmlidXRlOjEz") {
      id
      values {
        name
        id
      }
    }
  }
`;
