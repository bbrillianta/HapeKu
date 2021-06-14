module.exports = class CartService {
    #User;

    constructor(User) {
        this.#User = User;
    }

    async addProduct(body) {
        const { userId, productId, quantity } = body;
        try {
            const addedProduct = await this.#User.findByIdAndUpdate(
                userId, 
                { $push: { cartItems: { product: productId, quantity } } }, 
                { new: true }
            )
            .populate('cartItems.product');

            return addedProduct;
        } catch(e) {
            throw e;
        }
    }

    async getAllItem(query) {
        const { userId } = query;

        const user = await this.#User.findById(userId).populate('cartItems.product');

        return user.cartItems;
    }

    async getAllCheckoutItems(query) {
        const { userId } = query;
        
        const foundUser = await this.#User.findById(userId).populate('cartItems.product');

        const checkoutItems = foundUser.cartItems.filter((item) => item.checkout);

        return checkoutItems;
    }

    async updateItem(body) {
        let { itemId, ...updatedDoc } = { ...body };

        itemId = body.itemId;

        const updatedItem = await this.#User.findOneAndUpdate(
            { 'cartItems._id': itemId }, 
            { 
                $set: {
                    'cartItems.$.quantity': updatedDoc.quantity,
                    'cartItems.$.product': updatedDoc.product,
                    'cartItems.$.checkout': updatedDoc.checkout,
                    updated_at: new Date()
                }
            }, 
            { new: true }
        )
        .populate('cartItems.product');

        return updatedItem;
    }

    async removeItem(body) {
        const { userId, itemId } = body;
        try {
            const removedItem = await this.#User.findByIdAndUpdate(
                userId, 
                { $pull: { cartItems: { _id: itemId } } }, 
                { new: true }
            )
            .populate('cartItems.product');

            return removedItem;
        } catch(e) {
            throw e;
        }
    }
}