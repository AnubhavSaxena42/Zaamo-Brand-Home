import {gql} from '@apollo/client';

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
