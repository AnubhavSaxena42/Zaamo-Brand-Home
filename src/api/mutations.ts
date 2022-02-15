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

export const CREATE_VOUCHER = gql`
  mutation voucherBulkCreate($input: VoucherInput!, $stores: [String]!) {
    voucherBulkCreate(input: $input, stores: $stores) {
      success
      discountErrors {
        code
        field
        message
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation productCreate($input: ProductCreateInput!) {
    productCreate(input: $input) {
      productErrors {
        field
        message
      }
      product {
        id
        name
        brand {
          brandName
        }
      }
    }
  }
`;

export const CREATE_PRODUCT_IMAGE = gql`
  mutation productImageCreate($image: Upload!, $product: ID!) {
    productImageCreate(input: {image: $image, product: $product}) {
      productErrors {
        field
        message
      }
      product {
        id
      }
      image {
        id
      }
    }
  }
`;

export const CREATE_VARIANTS = gql`
  mutation productVariantBulkCreate(
    $product: ID!
    $variants: [ProductVariantBulkCreateInput]!
  ) {
    productVariantBulkCreate(product: $product, variants: $variants) {
      count
      productVariants {
        name
        id
        sku
      }
    }
  }
`;

export const TOKEN_CREATE = gql`
  mutation tokenCreate($mobileNo: String!) {
    tokenCreate(mobileNo: $mobileNo) {
      token
      user {
        id
        isActive
        userId
        authorisedBrands {
          id
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
            pageInfo {
              hasNextPage
            }
          }
        }

        influencer {
          id
        }
      }
    }
  }
`;
export const USER_REGISTER = gql`
  mutation userRegister($mobileNo: String!) {
    userRegister(input: {mobileNo: $mobileNo, isActive: false}) {
      user {
        id
        isActive
      }
      accountErrors {
        message
        field
      }
    }
  }
`;

export const GENERATE_OTP = gql`
  mutation GenerateOtp($mobileNo: String!) {
    generateOtp(mobileNo: $mobileNo) {
      success
      accountErrors {
        message
      }
    }
  }
`;

export const UPDATE_FULFILLMENT = gql`
  mutation updateFulFillment(
    $warehouseId: ID!
    $id: ID!
    $fulfillmentStatus: FulfillmentStatusEnum!
  ) {
    updateFulfillment(
      id: $id
      input: {warehouseId: $warehouseId, fulfillmentStatus: $fulfillmentStatus}
    ) {
      fulfillment {
        status
      }
      orderErrors {
        code
        field
        message
      }
    }
  }
`;

export const BRAND_UPI_ID_CREATE = gql`
  mutation brandUpiIdCreate($brand: ID!, $upiId: String!) {
    brandUpiIdCreate(input: {brand: $brand, upiId: $upiId}) {
      BrandUpiId {
        brand {
          brandName
          brandContactName
          active
        }
        upiId
      }
    }
  }
`;

export const BANK_ACCOUNT_CREATE = gql`
  mutation bankAccountCreate(
    $brand: ID!
    $acName: String!
    $acBankName: String!
    $acNumber: String!
    $acIfscCode: String!
    $acBankBranch: String!
  ) {
    bankAccountCreate(
      input: {
        brand: $brand
        acName: $acName
        acBankName: $acBankName
        acNumber: $acNumber
        acIfscCode: $acIfscCode
        acBankBranch: $acBankBranch
        active: true
      }
    ) {
      BankAccount {
        brand {
          brandName
          brandContactName
        }
        active
        acName
        acIfscCode
        acNumber
        acBankBranch
      }
    }
  }
`;

export const UPDATE_COLLECTION = gql`
  mutation collectionUpdate($id: ID!, $input: CollectionInput!) {
    collectionUpdate(id: $id, input: $input) {
      collection {
        id
        imageUrl
        name
      }
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation verifyOtp($mobileNo: String!, $otp: Int!) {
    verifyOtp(mobileNo: $mobileNo, otp: $otp) {
      success
      accountErrors {
        message
      }
    }
  }
`;

export const CREATE_SUPPORT_QUERY = gql`
  mutation supportQueryCreate(
    $email: String!
    $message: String!
    $mobileNo: String!
  ) {
    supportQueryCreate(
      input: {email: $email, message: $message, mobileNo: $mobileNo}
    ) {
      SupportQuery {
        email
        message
        mobileNo
        createdAt
      }
    }
  }
`;
