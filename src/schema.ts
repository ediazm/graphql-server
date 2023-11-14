const typeDefs = `#graphql
  type Bill {
    id: ID!
    companyName: String
    owner: String
    billAmount: Float
  }

  type Subscription {
    billEdited(billId: ID, billAmount: Float): Bill
  }

  type Query {
    bills: [Bill]
  }

  type Mutation {
    editBillAmount(billId: ID, billAmount: Float): modifiedBillAmountResponse
  }

  type modifiedBillAmountResponse {
    code: Int,
    success: Boolean,
    message: String,
  }
`;

export default typeDefs;