module.exports = class AuthController {
    #authService;

    constructor(authService) {
        this.#authService = authService;
    }

    async register(req, res, next) {
        try {
            const newUser = await this.#authService.register(req.body);

            res.json(newUser);
        } catch(e) {
            if(e.code === 11000) 
                return res.status(401).json({ message: e.message });
            
            next(e);
        }
    }

    async login(req, res, next) {
        try{
            const foundUser = await this.#authService.login(req.body);

            res.json(foundUser);
        } catch(e) {
            if(e.message === 'The credentials you entered did not match our records. Try again.')
                return res.status(401).json({ message: e.message });
            
            next(e);
        }
    }
}

