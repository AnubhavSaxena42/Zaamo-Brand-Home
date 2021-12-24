import {gql} from '@apollo/client';
export const GET_BRANDS = gql`
  query {
    brands(first: 50, sortBy: {direction: DESC, field: CREATED_AT}) {
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
export const GET_CATEGORIES = gql`
  {
    categories(first: 10) {
      edges {
        node {
          id
          slug
          name
          children(first: 10) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
