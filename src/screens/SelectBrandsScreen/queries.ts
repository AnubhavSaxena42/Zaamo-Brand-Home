import {gql} from '@apollo/client';
export const GET_BRANDS = gql`
  query {
    brands(first: 3, sortBy: {direction: DESC, field: CREATED_AT}) {
      edges {
        node {
          id
          brandName
          brandMedia
          store {
            id
            storeName
          }
          createdAt
          sizeFitNote
          shortDescription
          zaamoCreatorsGuidelines
          companyName
          brandContactName
          brandContactNumber
          active
          address {
            postalCode
            city
            streetAddress1
          }
          active
        }
      }
    }
  }
`;
