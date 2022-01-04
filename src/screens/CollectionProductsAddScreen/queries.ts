import {gql} from '@apollo/client';

export const GET_PRODUCTS_BY_BRAND = gql`
  query ($brands: [ID]) {
    products(first: 100, filter: {brands: $brands}) {
      edges {
        node {
          id
          name
          brand {
            brandName
          }
          thumbnail {
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
