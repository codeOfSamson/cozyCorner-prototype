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
    getAllRecords: [Record]
  }

  type Mutation {
    uploadCSV(filePath: String!): String
  }
`;

export default typeDefs;
