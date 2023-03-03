require('dotenv').config()

const endpoint = process.env.HASURA_GRAPHQL_ENDPOINT + "/v1/graphql"
console.log("🚀 | endpoint", endpoint)
module.exports = {
  schema: [{
    [endpoint]: {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET
      }
    }
  }],
  documents: "app/**/*.{graphql,gql,js,ts,jsx,tsx}",
};