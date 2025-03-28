const {buildSchema} = require('graphql')

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        email: String!
        name: String!
        password : String!
        status: String!
        posts: [Post!]!
    }  

    input UserInputData {
        email: String!
        name: String!
        password : String!
    }



    type AuthData {
        userId: String!
        token: String!
    }
        
    input PostInputData {
        title: String!
        content: String!
        imageUrl: String!
    }
    
    type PostData {
        posts: [Post!]!
        totalPosts: Int!
    }



    type RootMutation {
        createUser(userInput: UserInputData): User!
        createPost(postInput: PostInputData): Post!
        updatePost(postId: ID!, postInput: PostInputData): Post!
        deletePost(postId: ID!): Boolean!
    }


    type RootQuery {
        login(email: String!, password: String!): AuthData!
        getPosts: PostData!
    }
    schema {
            mutation: RootMutation
            query: RootQuery
        }
    `)