module.exports = class UserController {
    #cartService;
    #paymentService;
    #notificationService;

    constructor(cartService, paymentService, notificationService) {
        this.#cartService = cartService;
        this.#paymentService = paymentService;
        this.#notificationService = notificationService;
    }

    async createCartItem(req, res, next) {
        const addedProduct = await this.#cartService.addProduct(req.body);

        res.json(addedProduct);
    }

    async indexCartItem(req, res, next) {
        const items = await this.#cartService.getAllItem(req.query);

        res.json(items);
    }

    async updateCartItem(req, res, next) {
        const updatedItem = await this.#cartService.updateItem(req.body);

        res.json(updatedItem);
    }

    async deleteCartItem(req, res, next) {
        const removedItem = await this.#cartService.removeItem(req.body);

        res.json(removedItem);
    }

    async indexCheckoutItems(req, res, next) {
        const checkoutItems = await this.#cartService.getAllCheckoutItems(req.query);

        res.json(checkoutItems);
    }

    async createUnpaidItem(req, res, next) {
        const checkoutItems = await this.#paymentService.makeOrder(req.body);

        res.json(checkoutItems);
    }

    async indexUnpaidItems(req, res, next) {
        const unpaidItems = await this.#paymentService.getAllUnpaid(req.query);

        res.json(unpaidItems);
    }

    async deleteUnpaidItem(req, res, next) {
        const cancelledOrder = await this.#paymentService.cancelOrder(req.body);

        res.json(cancelledOrder);
    }

    async createTransaction(req, res, next) {
        const newTransaction = await this.#paymentService.payOrder(req.body, req.file);

        res.json(newTransaction);
    }

    async indexTransactions(req, res, next) {
        const userTransactions = await this.#paymentService.getAllPaid(req.query);

        res.json(userTransactions);
    }

    async indexNotifications(req, res, next) {
        const userNotifications = await this.#notificationService.getAllNotification(req.query);

        res.json(userNotifications);
    }
}