const User = require('../models/user')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Post = require('../models/post')
module.exports = {
    createUser: async function({userInput}, req){
        // validate user input
        // check if email, password and name are valid
        const errors = [];
        if(!validator.isEmail(userInput.email)){
            errors.push({message: 'Email is invalid.'})
        }
        if(validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, {min: 5})){
            errors.push({message: 'Password is invalid.'})
        }
        if(validator.isEmpty(userInput.name) || !validator.isLength(userInput.name, {min: 5})){
            errors.push({message: 'Name is invalid.'})
        }

        if(errors.length > 0){
            const error = new Error('Invalid input.')
            error.data = errors;
            error.code = 422; // unprocessable entity
            throw error;
        }
        
        const existingUser = await User
            .findOne({email: userInput.email})
        if(existingUser){
            throw new Error('User exists already.')
        }
        const hashedPassword = await bcrypt.hash(userInput.password, 12)
        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: hashedPassword
        })
        const result = await user.save()
        return {...result._doc,
            _id: result._id.toString(),
            password: null  
        } 
    },

    login: async function({email, password}, req){
        const user = await User.findOne({email: email})
        if(!user){
            const error = new Error('User not found.')
            error.code = 401; // unauthorized
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password)
        if(!isEqual){
            const error = new Error('Password is incorrect.')
            error.code = 401; // unauthorized
            throw error;
        }
        const token = jwt.sign({
            userId: user._id.toString(), 
            email: user.email},
            'somesupersecretsecret',{expiresIn: '1h'}
        )
        return {userId: user._id.toString(), token: token.toString()}
    },

    createPost : async function({postInput}, req) {
        if(!req.isAuth){
            const error = new Error('Not authenticated.')
            error.code = 401; // unauthorized
            throw error;
        }
        const errors = []
        if(validator.isEmpty(postInput.title) || !validator.isLength(postInput.title, {min: 5})){
            errors.push({message: 'Title is invalid.'})
        }
        if(validator.isEmpty(postInput.content) || !validator.isLength(postInput.content, {min: 5})){
            errors.push({message: 'Content is invalid.'})
        }
        if(validator.isEmpty(postInput.imageUrl)){
            errors.push({message: 'ImageUrl is invalid.'})
        }

        if(errors.length > 0){
            const error = new Error('Invalid input.')
            error.data = errors;
            error.code = 422; // unprocessable entity
            throw error;
        }

        const creator = await User.findById(req.userId)
        if(!creator){
            const error = new Error('User not found.')
            error.code = 401; // not found
            throw error;
        }
        const post = new Post({
            title: postInput.title,
            content: postInput.content,
            imageUrl: postInput.imageUrl,
            creator: creator
        })
        const result = await post.save()

        creator.posts.push(result)
        await creator.save()
        
        return {...result._doc, _id: result._id.toString() , createdAt: result.createdAt.toISOString(), updatedAt: result.updatedAt.toISOString()}
    },

    getPosts : async function(args, req) {
        if(!req.isAuth){
            const error = new Error('Not authenticated.')
            error.code = 401; // unauthorized
            throw error;
        }

        const totalPosts = await Post.countDocuments()
        const posts = await Post.find().sort({createdAt : -1}).populate('creator')
        if(totalPosts === 0){
            const error = new Error('No posts found.')
            error.code = 404; // not found
            throw error;
        }
        return {posts: posts.map(post => {
            return {...post._doc, _id: post._id.toString(), createdAt: post.createdAt.toISOString(), updatedAt: post.updatedAt.toISOString()}
        }), totalPosts: totalPosts}
    },

    updatePost : async function({postId, postInput}, req) {
        if(!req.isAuth){
            const error = new Error('Not authenticated.')
            error.code = 401; // unauthorized
            throw error;
        }

        const errors = []
        if(validator.isEmpty(postInput.title) || !validator.isLength(postInput.title, {min: 5})){
            errors.push({message: 'Title is invalid.'})
        }
        if(validator.isEmpty(postInput.content) || !validator.isLength(postInput.content, {min: 5})){
            errors.push({message: 'Content is invalid.'})
        }
        if(validator.isEmpty(postInput.imageUrl)){
            errors.push({message: 'ImageUrl is invalid.'})
        }

        if(errors.length > 0){
            const error = new Error('Invalid input.')
            error.data = errors;
            error.code = 422; // unprocessable entity
            throw error;
        }

        const post = await Post.findById(postId).populate('creator')
        if(!post){
            const error = new Error('Post not found.')
            error.code = 404; // not found
            throw error;
        }
        
        if(post.creator._id.toString() !== req.userId){
            const error = new Error('Not authorized to edit this post.')
            error.code = 403; // forbidden
            throw error;
        }
        
        post.title = postInput.title
        post.content = postInput.content
        post.imageUrl = postInput.imageUrl

        const result = await post.save()
        
        return {...result._doc, _id: result._id.toString(), createdAt: result.createdAt.toISOString(), updatedAt: result.updatedAt.toISOString()}
    },

    deletePost : async function({postId}, req) {
        if(!req.isAuth){
            const error = new Error('Not authenticated.')
            error.code = 401; // unauthorized
            throw error;
        }

        const post = await Post.findById(postId).populate('creator')
        if(!post){
            const error = new Error('Post not found.')
            error.code = 404; // not found
            throw error;
        }
        
        if(post.creator._id.toString() !== req.userId){
            const error = new Error('Not authorized to delete this post.')
            error.code = 403; // forbidden
            throw error;
        }

        await Post.findByIdAndRemove(postId)
        const creator = await User.findById(req.userId)
        creator.posts.pull(postId)
        await creator.save()
        
        return true;
    }
}