import { ProductResponse } from 'common/types';

export default class ProductModel {
    private static instance: ProductModel;

    public static getInstance(): ProductModel {
        if (!ProductModel.instance) {
            ProductModel.instance = new ProductModel();
        }
        return ProductModel.instance;
    }

    public async getProduct(id: string): Promise<ProductResponse> {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (response.status >= 300 || response.status < 200) {
            const error = new Error(`Product with id '${id}' not found`);
            throw error;
        }
        if (!response.headers.get('content-type')?.includes('application/json')) {
            const error = new Error('Incorrect response from the server');
            throw error;
        }
        const data: ProductResponse = await response.json();
        return data;
    }
}
