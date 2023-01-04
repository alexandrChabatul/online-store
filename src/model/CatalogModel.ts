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

    public async setProducts(): Promise<void> {
        if (this.products.length === 0) {
            const response = await fetch('https://dummyjson.com/products?limit=100');
            const data: APIResponse = await response.json();
            this.products = data.products;
        }
    }

    public getProducts(): ProductResponse[] {
        return this.products;
    }
}
