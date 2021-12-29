import {gql} from '@apollo/client';

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
