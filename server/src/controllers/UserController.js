module.exports = class UserController {
    #cartService;

    constructor(cartService) {
        this.#cartService = cartService;
    }

    async addToCart(req, res, next) {
        const updatedCart = await this.#cartService.addToCart(req.body);

        res.json(updatedCart);
    }

    async removeFromCart(req, res, next) {
        const updatedCart = await this.#cartService.removeFromCart(req.body);

        res.json(updatedCart);
    }
}