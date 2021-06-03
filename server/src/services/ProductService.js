module.exports = class ProductService {
    #Product;

    constructor(Product) {
        this.#Product = Product;
    }

    async getAllProduct() {
        try {
            const products = await this.#Product.find({});

            return products;
        } catch(e) {
            throw e;
        }
    }

    async getOneProduct(id) {
        try {
            const product = await this.#Product.findById(id);

            return product;
        } catch(e) {
            throw e;
        }
    }

    async createNewProduct(body) {
        try {
            const newProduct = await this.#Product.create(body);

            return newProduct;
        } catch(e) {
            throw e;
        }
    }

    async updateOneProduct(body) {
        const { id } = body;
        const updatedDoc = {
            name: body.name,
            description: body.description,
            images: body.images,
            thumbnail: body.thumbnail,
            price: body.price,
            quantity: body.quantity
        };
        
        try {
            const updatedProduct = await this.#Product.findByIdAndUpdate(id, updatedDoc, { new: true });

            return updatedProduct;
        } catch(e) {
            throw e;
        }
    }

    async deleteOneProduct(id) {
        try {
            const deletedProduct = await this.#Product.findByIdAndDelete(id);

            return deletedProduct;
        } catch(e) {
            throw e;
        }
    }
}