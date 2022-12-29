import { ProductResponse } from "common/types";

export default class ProductModel {
    private static instance: ProductModel;

    public static getInstance(): ProductModel {
        if (!ProductModel.instance) {
            ProductModel.instance = new ProductModel();
        }
        return ProductModel.instance;
    }

    public async getProduct(id: string): Promise<ProductResponse> {
        const response = fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => {
            if (res.status >= 200 && res.status < 300) {
                return res;
            } else {
                let error = new Error(`Product with id '${id}' not found`);
                throw error
            }
        })
        .then((res) => {
            if (!res.headers.get('content-type')?.includes('application/json')) {
                let error = new Error('Incorrect response from the server');
                throw error
            }
            return res;
        })
        .then(res => res.json())
        return response;
    }
}
