import { ProductResponse, APIResponse } from 'common/types';

class CatalogModel {
    data: ProductResponse[];

    constructor() {
        this.data = [];
    }

    public async getData() {
        if (this.data.length > 0) {
            return this.data;
        }

        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data: APIResponse = await response.json();
        this.data = data.products;
        return this.data;
    }
}

export default new CatalogModel();
