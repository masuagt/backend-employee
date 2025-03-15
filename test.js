const { gql } = require('graphql-tag');

console.log('gql function:', gql);

if (typeof gql !== 'function') {
  console.error('Error: gql is not a function. Check your graphql installation.');
} else {
  console.log('gql function is working correctly!');
}