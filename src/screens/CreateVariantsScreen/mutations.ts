import {gql} from '@apollo/client';

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
