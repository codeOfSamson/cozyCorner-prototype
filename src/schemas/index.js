import { gql } from "graphql-tag";

const typeDefs = gql`
  type Record {
    _id: ID!
    source: String
    timestamp: String
    data: JSON
  }

  scalar JSON

type Query {
  getRecords(limit: Int, offset: Int): [Record]
}

  type Mutation {
    uploadCSV(filePath: String!): String
  }
`;

export default typeDefs;
