import {gql} from '@apollo/client';

export const COLLECTION_CREATE = gql`
  mutation collectionCreate(
    $name: String!
    $imageUrl: String!
    $products: [ID]
  ) {
    collectionCreate(
      input: {
        name: $name
        imageUrl: $imageUrl
        isPublished: true
        products: $products
      }
    ) {
      collection {
        id
        name
        descriptionJson
        slug
        imageUrl
        products(first: 10) {
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
              images {
                url(size: 720)
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
        isPublished
      }
    }
  }
`;

export const ADD_PRODUCTS_COLLECTION = gql`
  mutation collectionAddProducts($collectionId: ID!, $products: [ID]!) {
    collectionAddProducts(collectionId: $collectionId, products: $products) {
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
