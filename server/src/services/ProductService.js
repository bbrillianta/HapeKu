const unlink = require('fs').unlink;

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

    async createNewProduct(body, files) {
        const images = files.images.map(image => this.#getImageMeta(image));
        const thumbnail = this.#getImageMeta(files.thumbnail[0]);
        const newDoc = {...body, thumbnail, images };

        try {
            const newProduct = await this.#Product.create(newDoc);

            return newProduct;
        } catch(e) {
            throw e;
        }
    }

    async updateOneProduct(body, files) {
        const { id } = body;

        let updatedDoc = { ...body, updated_at: new Date() };

        if(files.images) {
            const images = files.images.map(image => this.#getImageMeta(image));
            updatedDoc = {...updatedDoc, images };
        }

        if(files.thumbnail) {
            const thumbnail = this.#getImageMeta(files.thumbnail[0]);
            updatedDoc = {...updatedDoc, thumbnail };
        }
        
        try {
            const product = await this.#Product.findByIdAndUpdate(id, updatedDoc);

            if(files.thumbnail)
                unlink(product.thumbnail.path, (err) => { if(err) throw err; });

            if(files.images) {
                for(const image of product.images) {
                    unlink(image.path, (err) => { if(err) throw err; });
                }
            }

            const updatedProduct = { ...product.toObject(), ...updatedDoc };

            return updatedProduct;
        } catch(e) {
            throw e;
        }
    }

    async deleteOneProduct(id) {
        try {
            const deletedProduct = await this.#Product.findByIdAndDelete(id);

            unlink(deletedProduct.thumbnail.path, (err) => { if(err) throw err; });

            for (const image of deletedProduct.images) {
                unlink(image.path, (err) => { if(err) throw err; });
            }

            return deletedProduct;
        } catch(e) {
            throw e;
        }
    }

    #getImageMeta(image) {
        return { 
            path: image.path.replace(/\\/g, '/'), 
            mimeType: image.mimetype 
        }
    }
}