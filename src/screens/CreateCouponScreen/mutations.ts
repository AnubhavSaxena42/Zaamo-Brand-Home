import {gql} from '@apollo/client';

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
