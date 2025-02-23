const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    cart : {
        items : [{
            productId : {
                type : Schema.Types.ObjectId, 
                required : true ,
                ref : 'Product'},
            quantity : {
                type : Number, 
                required : true},
        }],
        
    }
});

UserSchema.methods.addToCart = function(product){
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }
    const updatedCart = {
        items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save(); 
}  


UserSchema.methods.deleteItemFromCart = function(prodId){
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== prodId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
}

UserSchema.methods.addOrder = function(){
    return this.getCart()
    .then(products => {
        const order = {
            items: products,
            user: {
                _id: new mongodb.ObjectId(this._id),
                name: this.name
            }
        };
        return this
        .insertOne(order);
        })
    .then(result => {
        this.cart = { items: [] };
        return this
        .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: {items: []}}});
    })
    .catch(err => {
        console.log(err); 
    });
}

UserSchema.methods.getOrders = function(){
    return this
    .find({'user._id': new mongodb.ObjectId(this._id)})
    .toArray();
}


module.exports = mongoose.model('User', UserSchema);