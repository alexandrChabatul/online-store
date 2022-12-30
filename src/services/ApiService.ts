import { BadResponse, ProductResponse } from 'common/types';

export default class ApiService {
    public async getProduct(id: string): Promise<ProductResponse | BadResponse> {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            if (!response.ok) {
                return { errorMessage: `Product with id '${id}' not found` };
            }
            if (!response.headers.get('content-type')?.includes('application/json')) {
                return { errorMessage: `Incorrect response from the server` };
            }
            const data: ProductResponse = await response.json();
            return data;
        } catch {
            return { errorMessage: 'Something went wrong. The server is temporarily unavailable.' };
        }
    }
}
