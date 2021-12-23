import {gql} from '@apollo/client';

export const GET_ORDERS = gql`
  {
    orders(first: 10) {
      edges {
        node {
          id
          created
          lines {
            id
            productSku
            productName
            quantity
            totalPrice {
              net {
                amount
              }
              gross {
                amount
              }
            }
          }
          fulfillments {
            id
            status
            fulfillmentOrder
            lines {
              id
              quantity
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
