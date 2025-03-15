const { gql } = require('graphql-tag');

// Debugging: Log the gql function
//console.log('gql function:', gql);

if (typeof gql !== 'function') {
  throw new Error('gql is not a function. Check your graphql installation.');
}

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    email: String!
    position: String
    created_at: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    username: String!
  }

  type Query {
    employees: [Employee!]!
    employee(id: ID!): Employee
    me: User
  }

  type Mutation {
    addEmployee(name: String!, email: String!, position: String): Employee!
    updateEmployee(id: ID!, name: String, email: String, position: String): Employee!
    deleteEmployee(id: ID!): Boolean!

    login(username: String!, password: String!): AuthPayload!
    register(username: String!, password: String!): AuthPayload!
  }
`;

module.exports = typeDefs;