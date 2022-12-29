import { ProductResponse, APIResponse } from 'common/types';

class CatalogModel {
    products: ProductResponse[];

    constructor() {
        this.products = [];
    }

    public async getProducts(): Promise<ProductResponse[]> {
        if (this.products.length > 0) {
            return this.products;
        }

        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data: APIResponse = await response.json();
        this.products = data.products;
        return this.products;
    }
}

export default new CatalogModel();
