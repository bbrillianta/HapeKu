const bcrypt = require('bcrypt');

module.exports = class AuthService {
    #User;

    constructor(User) {
        this.#User = User;
    }

    async register(inputs) {
        const { password } = inputs;

        try {
            const hashedPasswd = await bcrypt.hash(password, 10);

            const doc = {
                ...inputs,
                password: hashedPasswd
            }

            const newUser = await this.#User.create(doc);

            return newUser;
        } catch(e) {
            throw e;
        }
    }

    async login(inputs) {
        const { email, username, password } = inputs;

        try {
            const foundUser = await this.#User.findOne({ 
                $or: [
                    { email }, 
                    { username }
                ]
            });

            if(!foundUser) 
                throw new Error('The credentials you entered did not match our records. Try again.');

            const validPasswd = await bcrypt.compare(password, foundUser.password);

            if(!validPasswd) 
                throw new Error('The credentials you entered did not match our records. Try again.');
            
            return foundUser;
        } catch(e) {
            throw e;
        }
    }
}