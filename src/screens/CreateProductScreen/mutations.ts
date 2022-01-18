import {gql} from '@apollo/client';

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
