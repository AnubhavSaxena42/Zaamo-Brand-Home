import {gql} from '@apollo/client';

export const CREATE_SUPPORT_QUERY = gql`
  mutation supportQueryCreate(
    $email: String!
    $mobileNo: String!
    $message: String!
  ) {
    supportQueryCreate(
      input: {email: $email, mobileNo: $mobileNo, message: $message}
    ) {
      SupportQuery {
        createdAt
        message
        email
        mobileNo
      }
    }
  }
`;
