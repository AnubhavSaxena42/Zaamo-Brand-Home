import {gql} from '@apollo/client';

export const GET_COLOR_VALUES = gql`
  query {
    attributes(first: 100, filter: {search: "color"}) {
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
