# GraphQL Mutations and Queries for User and Post Management

This document outlines the GraphQL mutations and queries used for user and post management. It includes examples for creating users, logging in, creating, updating, and deleting posts, and retrieving all posts.
## use token for crud operations on posts (pass as headers as "Authorization" : "Bearer <token>"
## User Management
### Login
```{
    login(email : "gaurav@njit.edu", password: "gaurav")
    {
        userId
        token
    }
}```



### Signup User
```
mutation{
    createUser(userInput : {
        email : "gaurav@gmail.com",
        name : "gaurav",
        password : "gaurav"
    })
    {
        _id
        email
        name
        status
    }
}
```

### Create Post
```
mutation{
  createPost(postInput:{
    title : "How to Post on Instagram - The Full Guide",
    content : "Learning how to post content on social media is an essential step in executing your social media management strategy. We have covered how you can post organic content on Facebook as well as the best times to post on social media networks, but now let's talk about Instagram. ",
    imageUrl : "https://images.prismic.io/meltwater/3a4f046a-0b95-4eb2-95ab-97c87a1e3c3e_instagram-full-guide-eng-15-01-2020.jpg?q=90&rect=0,0,5472,3648&&w=828&dpr=1"
  }){
    _id
    title
    content 
    imageUrl
    createdAt
    updatedAt
    creator { name }
  }
}

```
### Get all posts
```
query {
    getPosts {
        posts {
            _id
            title
            content
            imageUrl
            createdAt
            updatedAt
        }
        totalPosts
    }
}

```
### Update post with id
```
mutation{
    updatePost(
        postId : "67dba48031219019b4fd60c7",
        postInput : {
            title : "new title",
            content : "new content",
            imageUrl : "new imageurl"
        }
    )
    {
        _id
        title
        content
        imageUrl
        createdAt
        updatedAt
    }
}
```

### Delete User with id
```
mutation {
    deletePost(postId: "67dba24d170e19301cf6cfb8")
}

```


