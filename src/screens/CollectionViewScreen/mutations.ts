import {gql} from '@apollo/client/core';

export const REMOVE_PRODUCT_COLLECTION = gql`
  mutation collectionRemoveProducts($collectionId: ID!, $products: [ID]!) {
    collectionRemoveProducts(collectionId: $collectionId, products: $products) {
      collection {
        id
        name
        slug
        imageUrl
        products(first: 100) {
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
        }
      }
    }
  }
`;
