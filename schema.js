const axios = require('axios')
const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql')
const localhost = 'http://localhost'
const port = '3000'
const url = localhost + ':' + port
const customerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    age: {type: GraphQLString}
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: customerType,
      args: {
        id: {type: GraphQLString}
      },
      resolve(parentVal, args) {
        return axios.get(url + '/users/' + args.id).then(res => res.data)
      }
    },
    customers: {
      type: new GraphQLList(customerType),
      resolve(parentVal, args) {
        return axios.get(url + '/users').then(res => res.data)
      }
    }
  }
})

const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: {
      type: customerType,
      args: {
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLString}
      },
      resolve(parentVal, args) {
        return axios
          .post(url + '/users', {
            name: args.name,
            email: args.email,
            age: args.age
          })
          .then(res => res.data)
      }
    },
    edit: {
      type: customerType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLString}
      },
      resolve(parentVal, args) {
        return axios
          .patch(url + '/users/' + args.id, args)
          .then(res => res.data)
      }
    },
    delete: {
      type: customerType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentVal, args) {
        return axios.delete(url + '/users/' + args.id).then(res => res.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
})
