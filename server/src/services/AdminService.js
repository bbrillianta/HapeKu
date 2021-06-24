module.exports = class AdminService {
    #User;
    #Transaction;
    #Product;

    constructor(User, Transaction, Product) {
        this.#User = User;
        this.#Transaction = Transaction;
        this.#Product = Product;
    }

    async getAllTransactions() {
        const transactions = await this.#Transaction.find({ 'payment.verified': false }).populate('products.product').populate('user');

        return transactions;
    }

    async verifyPayment(body) {
        const { transactionId, userId } = body;

        const updatedTransaction = await this.#Transaction.findByIdAndUpdate(
            transactionId, 
            { 'payment.verified': true },
            { new: true }
        );
        
        updatedTransaction.products.forEach(product => {
            this.#Product.updateOne({ _id: product.product }, { $inc: { quantity: -product.quantity }}, (err, result) => {});
        });
        
        const notification = `Pesanan ${updatedTransaction._id} telah diverifikasi dan siap untuk diantar`;

        const updatedUserNotification = await this.#User.findByIdAndUpdate(
            userId,
            { $push: { notifications: notification } },
            { new: true }
        )

        return { updatedTransaction, updatedUserNotification };
    }

    async invalidPayment(body) {
        const { transactionId, userId } = body;

        const deletedTransaction = await this.#Transaction.findByIdAndDelete(transactionId);

        const notifictaion = `Bukti pembayaran pesanan ${deletedTransaction._id} telah ditolak oleh admin, pastikan bukti pembayaran yang anda sertakan sudah benar dan jelas`;
        
        const updatedUserNotification = await this.#User.findByIdAndUpdate(
            userId,
            { $push: { notifications: notifictaion, unpaidItems: { products: deletedTransaction.products, address: deletedTransaction.address } }, $pull: { transactions: transactionId } },
            { new: true }
        );

        return { deletedTransaction, updatedUserNotification };
    }
}