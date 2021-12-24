import {gql} from '@apollo/client';

export const GET_CATEGORIES = gql`
  {
    categories(first: 10) {
      edges {
        node {
          id
          slug
          name
          children(first: 10) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
