module.exports = class AdminService {
    #User;
    #Transaction;

    constructor(User, Transaction) {
        this.#User = User;
        this.#Transaction = Transaction;
    }

    async verifyPayment(body) {
        const { transactionId, userId } = body;

        const updatedTransaction = await this.#Transaction.findByIdAndUpdate(
            transactionId, 
            { 'payment.verified': true },
            { new: true }
        );
        
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