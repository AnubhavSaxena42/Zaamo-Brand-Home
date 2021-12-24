import {gql} from '@apollo/client';

export const GET_COUPONS = gql`
  query {
    vouchers(
      last: 2
      filter: {status: EXPIRED}
      sortBy: {field: START_DATE, direction: DESC}
    ) {
      pageInfo {
        endCursor
      }
      edges {
        node {
          id
          name
          code
          metadata {
            key
            value
          }

          store {
            id
            storeName
          }
        }
      }
    }
  }
`;
