import { ProductResponse, APIResponse } from 'common/types';

export default class CatalogModel {
    private static instance: CatalogModel;
    private products: ProductResponse[];

    private constructor() {
        this.products = [];
    }

    public static getInstance(): CatalogModel {
        if (!this.instance) {
            this.instance = new CatalogModel();
        }
        return this.instance;
    }

    public async getProducts() {
        if (this.products.length > 0) {
            return this.products;
        }

        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data: APIResponse = await response.json();
        this.products = data.products;
        return this.products;
    }
}
