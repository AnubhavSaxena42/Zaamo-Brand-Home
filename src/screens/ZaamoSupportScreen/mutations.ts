import {gql} from '@apollo/client';

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
