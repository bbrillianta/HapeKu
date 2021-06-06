module.exports = class UserController {
    #cartService;

    constructor(cartService) {
        this.#cartService = cartService;
    }

    async addProductToCart(req, res, next) {
        const addedProduct = await this.#cartService.addProduct(req.body);

        res.json(addedProduct);
    }

    async updateItemInCart(req, res, next) {
        const updatedItem = await this.#cartService.updateItem(req.body);

        res.json(updatedItem);
    }

    async removeItemFromCart(req, res, next) {
        const removedItem = await this.#cartService.removeItem(req.body);

        res.json(removedItem);
    }
}