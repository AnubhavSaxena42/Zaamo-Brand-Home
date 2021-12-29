import {gql} from '@apollo/client';

export const GET_COUPONS = gql`
  query {
    vouchers(
      first: 10
      filter: {status: ACTIVE}
      sortBy: {field: START_DATE, direction: DESC}
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
          code
          discountValue
          discountValueType
          metadata {
            key
            value
          }
          endDate
          store {
            id
            storeName
          }
        }
      }
    }
  }
`;
