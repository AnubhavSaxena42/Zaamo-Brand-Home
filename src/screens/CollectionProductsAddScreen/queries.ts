import {gql} from '@apollo/client';

export const GET_PRODUCTS_BY_BRAND = gql`
  query ($brands: [ID], $endCursor: String!) {
    products(first: 20, after: $endCursor, filter: {brands: $brands}) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          brand {
            brandName
          }
          thumbnail(size: 1080) {
            url
            alt
          }
          pricing {
            discount {
              gross {
                amount
              }
            }
            priceRange {
              start {
                net {
                  amount
                }
              }
            }
          }
          productType {
            name
          }
          name
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
