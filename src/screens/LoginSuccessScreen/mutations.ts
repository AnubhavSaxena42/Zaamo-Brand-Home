import {gql} from '@apollo/client';

export const TOKEN_CREATE = gql`
  mutation tokenCreate($mobileNo: String!) {
    tokenCreate(mobileNo: $mobileNo) {
      token
      user {
        id
        isActive
        userId
        authorisedBrands {
          id
          products(first: 20) {
            edges {
              node {
                id
                name
                brand {
                  brandName
                }
                thumbnail {
                  url
                  alt
                }
                pricing {
                  discount {
                    gross {
                      amount
                    }
                  }
                  priceRange {
                    start {
                      net {
                        amount
                      }
                    }
                  }
                }
                productType {
                  name
                }
                name
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }

        influencer {
          id
        }
      }
    }
  }
`;
export const USER_REGISTER = gql`
  mutation userRegister($mobileNo: String!) {
    userRegister(input: {mobileNo: $mobileNo, isActive: true}) {
      user {
        id
        isActive
      }
      accountErrors {
        message
        field
      }
    }
  }
`;
