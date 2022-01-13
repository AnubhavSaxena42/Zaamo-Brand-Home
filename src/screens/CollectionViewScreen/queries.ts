import {gql} from '@apollo/client';

export const GET_COLLECTION_BY_ID = gql`
  query ($id: ID!, $endCursor: String!) {
    collection(id: $id) {
      id
      name
      slug
      imageUrl
      products(first: 10, after: $endCursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            name
            images {
              url(size: 1080)
            }
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
      }
    }
  }
`;
