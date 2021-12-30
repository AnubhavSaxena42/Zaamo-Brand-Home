import {gql} from '@apollo/client';

export const GET_STORE = gql`
  query {
    store {
      storeName
      id
      storeType
      defaultCollection {
        id
        name
        imageUrl
        products(first: 10) {
          edges {
            node {
              id
            }
          }
        }
      }
      collections(first: 10) {
        edges {
          node {
            id
            name
            imageUrl
            products(first: 10) {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_AUTHORISED_BRANDS = gql`
  query {
    userByMobile(mobileNo: "919953724117") {
      authorisedBrands {
        id
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
          pageInfo {
            hasNextPage
          }
        }
      }
    }
  }
`;
