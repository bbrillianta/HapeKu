module.exports = class AdminController {
    #adminService;

    constructor(adminService) {
        this.#adminService = adminService;
    }

    async indexTransactions(req, res, next) {
        const transactions = await this.#adminService.getAllTransactions();

        res.json(transactions);
    }

    async editTransactionVerification(req, res, next) {
        const updatedTransaction = await this.#adminService.verifyPayment(req.body);

        res.json(updatedTransaction);
    }

    async deleteTransaction(req, res, next) {
        const deletedTransaction = await this.#adminService.invalidPayment(req.body);

        res.json(deletedTransaction);
    }
}