import {gql} from '@apollo/client';

export const CREATE_COUPON = gql`
  mutation voucherBulkCreate(
    $type: VoucherTypeEnum!
    $name: String!
    $code: String!
    $discountValueType: DiscountValueTypeEnum!
    $discountValue: PositiveDecimal!
    $brands: [ID]
    $owner: VoucherOwnerEnum!
    $metadata: [MetadataInput]
    $stores: [String]!
  ) {
    voucherBulkCreate(
      input: {
        type: $type
        name: $name
        code: $code
        discountValue: $discountValue
        discountValueType: $discountValueType
        owner: $owner
        brands: $brands
        metadata: $metadata
      }
      stores: $stores
    ) {
      success
      discountErrors {
        code
        field
        message
      }
    }
  }
`;

export const CREATE_ENTIRE_ORDER_COUPON = gql`
  mutation voucherBulkCreate(
    $type: VoucherTypeEnum!
    $name: String!
    $code: String!
    $discountValueType: DiscountValueTypeEnum!
    $discountValue: PositiveDecimal!
    $owner: VoucherOwnerEnum!
    $metadata: [MetadataInput]
    $stores: [String]!
  ) {
    voucherBulkCreate(
      input: {
        type: $type
        name: $name
        code: $code
        discountValue: $discountValue
        discountValueType: $discountValueType
        owner: $owner
        metadata: $metadata
      }
      stores: $stores
    ) {
      success
      discountErrors {
        code
        field
        message
      }
    }
  }
`;
