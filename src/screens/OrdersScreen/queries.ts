import {gql} from '@apollo/client';

export const GET_ORDERS = gql`
  {
    orders(first: 100) {
      edges {
        node {
          id
          total {
            net {
              amount
              currency
            }
            gross {
              amount
              currency
            }
          }
          number
          user {
            userId
            firstName
            email
            mobileNo
            lastName
            avatar {
              url
            }
            defaultBillingAddress {
              streetAddress1
              streetAddress2
              postalCode
            }
          }
          created
          lines {
            id
            productSku
            productName
            thumbnail {
              url
            }
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
              orderLine {
                id
                productSku
                productName
                thumbnail {
                  url
                }
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
