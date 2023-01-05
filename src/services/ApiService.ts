import appConstants from 'common/constants';
import { BadResponse, ProductResponse, APIResponse } from 'common/types';

export default class ApiService {
    public async getProduct(id: string): Promise<ProductResponse | BadResponse> {
        try {
            const response = await fetch(`${appConstants.productsApi}/${id}.json`);
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

    public async setProducts(): Promise<APIResponse> {
        try {
            const response = await fetch(`${appConstants.productsApi}.json`);
            if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
                throw new Error('Server unavailable');
            } else {
                const data: APIResponse = await response.json();
                return data;
            }
        } catch {
            throw new Error('Something went wrong');
        }
    }
}
