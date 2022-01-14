import {gql} from '@apollo/client';
import {getItemFromStorage} from '../../services/storage-service';

export const GET_STORE = gql`
  query ($collectionEndCursor: String!) {
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
          totalCount
          edges {
            node {
              id
              name
              images {
                url(size: 1080)
              }
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
      collections(first: 20, after: $collectionEndCursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            name
            slug
            imageUrl
            products(first: 10) {
              totalCount
              edges {
                node {
                  id
                  name
                  images {
                    url(size: 1080)
                  }
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
  query ($mobileNo: String!, $endCursor: String!) {
    userByMobile(mobileNo: $mobileNo) {
      authorisedBrands {
        id
        brandName
        warehouse
        products(first: 10, after: $endCursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              name
              images {
                url(size: 1080)
              }
              url
              descriptionJson
              brand {
                brandName
              }
              thumbnail(size: 720) {
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
  query ($endCursor: String!) {
    vouchers(
      first: 10
      after: $endCursor
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
          products(first: 20) {
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
