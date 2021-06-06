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
            );

            return addedProduct;
        } catch(e) {
            throw e;
        }
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
                    updated_at: new Date()
                }
            }, 
            { new: true }
        );

        return updatedItem;
    }

    async removeItem(body) {
        const { userId, itemId } = body;
        try {
            const removedItem = await this.#User.findByIdAndUpdate(
                userId, 
                { $pull: { cartItems: { _id: itemId } } }, 
                { new: true }
            );

            return removedItem;
        } catch(e) {
            throw e;
        }
    }
}