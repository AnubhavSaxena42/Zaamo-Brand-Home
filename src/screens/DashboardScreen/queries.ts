import {gql} from '@apollo/client';
import {getItemFromStorage} from '../../services/storage-service';

export const GET_STORE = gql`
  query {
    store {
      storeName
      id
      slug
      storeType
      defaultCollection {
        id
        name
        imageUrl
        products(first: 50) {
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
      collections(first: 50) {
        edges {
          node {
            id
            name
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
    }
  }
`;

export const GET_AUTHORISED_BRANDS = gql`
  query ($mobileNo: String!) {
    userByMobile(mobileNo: $mobileNo) {
      authorisedBrands {
        id
        brandName
        warehouse
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
export const GET_COUPONS = gql`
  query {
    vouchers(
      first: 100
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
