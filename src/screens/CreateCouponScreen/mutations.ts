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
        brands: $brands
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
