module.exports = class CartService {
    #User;

    constructor(User) {
        this.#User = User;
    }

    async addToCart(body) {
        const { userId, productId, quantity } = body;
        try {
            const updatedCart = await this.#User.findByIdAndUpdate(
                userId, 
                { $push: { cartItems: { product: productId, quantity } } }, 
                { new: true }
            );

            return updatedCart;
        } catch(e) {
            throw e;
        }
    }

    async removeFromCart(body) {
        const { userId, productId } = body;
        try {
            const updatedCart = await this.#User.findByIdAndUpdate(
                userId, 
                { $pull: { cartItems: { product: productId } } }, 
                { new: true }
            );

            return updatedCart;
        } catch(e) {
            throw e;
        }
    }
}