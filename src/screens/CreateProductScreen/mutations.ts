import {gql} from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation productCreate($input: ProductCreateInput!) {
    productCreate(input: $input) {
      product {
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
      }
    }
  }
`;

export const CREATE_PRODUCT_IMAGE = gql`
  mutation productImageCreate($image: Upload!, $product: ID!) {
    productImageCreate(input: {image: $image, product: $product}) {
      product {
        id
      }
      image {
        id
      }
    }
  }
`;
