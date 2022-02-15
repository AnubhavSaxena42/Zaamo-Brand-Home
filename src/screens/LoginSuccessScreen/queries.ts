import {gql} from '@apollo/client';

export const GET_USER_ACTIVE = gql`
  query ($mobileNo: String!) {
    userByMobile(mobileNo: $mobileNo) {
      userId
      id
      isActive
    }
  }
`;
