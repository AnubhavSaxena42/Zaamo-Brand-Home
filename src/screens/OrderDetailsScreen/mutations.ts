import {gql} from '@apollo/client';

export const UPDATE_FULFILLMENT = gql`
  mutation updateFulFillment(
    $warehouseId: ID!
    $id: ID!
    $fulfillmentStatus: FulfillmentStatusEnum!
  ) {
    updateFulfillment(
      id: $id
      input: {warehouseId: $warehouseId, fulfillmentStatus: $fulfillmentStatus}
    ) {
      fulfillment {
        status
      }
      orderErrors {
        code
        field
        message
      }
    }
  }
`;
