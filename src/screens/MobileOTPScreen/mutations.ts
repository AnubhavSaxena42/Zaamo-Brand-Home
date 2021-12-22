import {gql} from '@apollo/client';

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
