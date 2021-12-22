import {gql} from '@apollo/client';

export const TOKEN_CREATE = gql`
  mutation tokenCreate($mobileNo: String!) {
    tokenCreate(mobileNo: $mobileNo) {
      token
      user {
        id
        isActive
        userId
        influencer {
          id
        }
      }
    }
  }
`;
