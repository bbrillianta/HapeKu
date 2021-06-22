module.exports = class NotificationService {
    #User;

    constructor(User) {
        this.#User = User;
    }

    async getAllNotification(query) {
        const { userId } = query;

        const foundUser = await this.#User.findById(userId);

        return foundUser.notifications;
    }
}