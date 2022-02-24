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
          images {
            url(size: 1080)
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

export const GET_COLLECTION_BY_ID = gql`
  query ($id: ID!, $endCursor: String!) {
    collection(id: $id) {
      id
      name
      slug
      imageUrl
      products(first: 20, after: $endCursor) {
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
`;

export const GET_STORES = gql`
  query {
    stores(first: 100) {
      edges {
        node {
          id
          storeName
          storeUrl
          slug
        }
      }
    }
  }
`;

export const GET_BRANDS = gql`
  query {
    brands(first: 100) {
      edges {
        node {
          brandName
          id
        }
      }
    }
  }
`;

export const GET_PRODUCT_TYPES = gql`
  query {
    productTypes(first: 10) {
      edges {
        node {
          id
          name
          variantAttributes {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_SIZE_VALUES = gql`
  query {
    attribute(id: "QXR0cmlidXRlOjEz") {
      id
      values {
        name
        id
      }
    }
  }
`;

export const GET_STORE = gql`
  query ($collectionEndCursor: String!) {
    store {
      storeName
      id
      slug
      storeType
      storeUrl
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
              descriptionJson
              variants {
                id
                name
              }
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
  query ($mobileNo: String!, $endCursor: String!, $stores: [ID]) {
    userByMobile(mobileNo: $mobileNo) {
      authorisedBrands {
        id
        brandName
        warehouse
        products(first: 20, after: $endCursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              name
              collections(stores: $stores) {
                id
                name
              }
              slug
              variants {
                id
                price {
                  amount
                  currency
                }
                costPrice {
                  amount
                  currency
                }
                stocks {
                  quantity
                }
                name
              }
              images {
                url(size: 1080)
              }
              url
              descriptionJson
              brand {
                brandName
              }
              thumbnail(size: 480) {
                url
                alt
              }
              pricing {
                priceRangeUndiscounted {
                  start {
                    net {
                      amount
                    }
                  }
                }
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

export const GET_USER_ACTIVE = gql`
  query ($mobileNo: String!) {
    userByMobile(mobileNo: $mobileNo) {
      userId
      id
      isActive
    }
  }
`;

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
          shippingAddress {
            firstName
            lastName
            streetAddress1
            streetAddress2
            city
            countryArea
            postalCode
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
            fulfilment {
              id
              status
              shippingFulfillment {
                shippingId
                shippingProvider
              }
              fulfillmentOrder
            }
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
            shippingFulfillment {
              shippingId
              shippingProvider
            }
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

export const GET_COLOR_VALUES = gql`
  query {
    attributes(first: 100, filter: {search: "color"}) {
      edges {
        node {
          id
          name
          valueRequired
          values {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query ($stores: [ID]!, $productId: ID!) {
    product(id: $productId) {
      id
      name
      collections(stores: $stores) {
        id
        name
      }
      slug
      variants {
        id
        price {
          amount
          currency
        }
        costPrice {
          amount
          currency
        }
        stocks {
          quantity
        }
        name
      }
      images {
        url(size: 1080)
      }
      url
      descriptionJson
      brand {
        brandName
      }
      thumbnail(size: 480) {
        url
        alt
      }
      pricing {
        priceRangeUndiscounted {
          start {
            net {
              amount
            }
          }
        }
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
`;
