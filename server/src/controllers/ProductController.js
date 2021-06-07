module.exports = class ProductController {
    #productService;

    constructor(productService) {
        this.#productService = productService;
    }

    async index(req, res, next) {
        const products = await this.#productService.getAllProduct();

        res.json(products);
    }

    async show(req, res, next) {
        const product = await this.#productService.getOneProduct(req.params.id);

        res.json(product);
    }

    async create(req, res, next) {
        const newProduct = await this.#productService.createNewProduct(req.body, req.files);

        res.json(newProduct);
    }

    async update(req, res, next) {
        const updatedProduct = await this.#productService.updateOneProduct(req.body, req.files);

        res.json(updatedProduct);
    }

    async delete(req, res, next) {
        const deletedProduct = await this.#productService.deleteOneProduct(req.body.id);

        res.json(deletedProduct);
    }
}