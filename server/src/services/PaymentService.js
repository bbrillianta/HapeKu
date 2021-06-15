const getImageMeta = require('../helpers/getImageMeta');

module.exports = class PaymentService {
    #User;
    #Transaction

    constructor(User, Transaction) {
        this.#User = User;
        this.#Transaction = Transaction;
    }   

    async makeOrder(body) {
        const { userId, address } = body;

        let foundUser = await this.#User.findById(userId);

        let updatedCart = [];
        let updatedUnpaidItems = foundUser.unpaidItems;
        const updatedUnpaidIndex = updatedUnpaidItems.length;

        for(const item of foundUser.cartItems) {
            if(item.checkout) {
                if(updatedUnpaidItems[updatedUnpaidIndex])
                    updatedUnpaidItems[updatedUnpaidIndex].products.push(item);
                else
                    updatedUnpaidItems.push({ products: item, address })
            }
            else
                updatedCart.push(item);
        }

        foundUser.cartItems = updatedCart;
        foundUser.unpaidItems = updatedUnpaidItems;

        const updatedUser = await foundUser.save();

        return updatedUser;
    }

    async payOrder(body, file) {
        const { userId, unpaidItemId } = body;
        
        const foundUser = await this.#User.findById(userId);

        for(let index = 0; index < foundUser.unpaidItems.length; index++) {
            const unpaidItem = foundUser.unpaidItems[index];
            
            if(unpaidItem._id == unpaidItemId) {
                foundUser.unpaidItems.splice(index, 1);

                await foundUser.save();

                const newDoc = {
                    user: userId,
                    address: unpaidItem.address,
                    products: unpaidItem.products,
                    payment: {
                        confirmation: getImageMeta(file)
                    }
                };

                const newTransaction = await this.#Transaction.create(newDoc);
        
                const paidUser = await this.#User.findByIdAndUpdate(userId, { $push: { transactions: newTransaction._id }}, { new: true });
        
                return paidUser;
            }
        }

        throw new Error('No item found');
    }

    async getAllUnpaid(query) {
        const { userId } = query;

        const foundUser = await this.#User.findById(userId).populate('unpaidItems.products.product');

        return foundUser.unpaidItems;
    }

    async getAllPaid(query) {
        const { userId } = query;

        const foundUser = await this.#Transaction.find({ user: userId }).populate('products.product');

        return foundUser;
    }

    async cancelOrder(body) {
        const { userId, unpaidItemId } = body;
        try {
            const removedUnpaidItem = await this.#User.findByIdAndUpdate(
                userId, 
                { $pull: { unpaidItems: { _id: unpaidItemId } } }, 
                { new: true }
            );

            return removedUnpaidItem;
        } catch(e) {
            throw e;
        }
    }
}