import appConstants from 'common/constants';
import { BadResponse, ProductResponse, APIResponse } from 'common/types';

export default class ApiService {
    public async getProduct(id: string): Promise<ProductResponse | BadResponse> {
        try {
            const response = await fetch(`${appConstants.productsApi}/${Number(id) - 1}.json`);
            if (!response.ok) {
                return { errorMessage: `Product with id "${id}" not found` };
            }
            if (!response.headers.get('content-type')?.includes('application/json')) {
                return { errorMessage: `Incorrect response from the server` };
            }
            const data: ProductResponse = await response.json();
            if (data === null) {
                return { errorMessage: `Product with id "${id}" not found` };
            }
            return data;
        } catch {
            return { errorMessage: 'Something went wrong. The server is temporarily unavailable.' };
        }
    }

    public async getProducts(): Promise<APIResponse | undefined> {
        try {
            const response = await fetch(`${appConstants.productsApi}.json`);
            if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
                console.error('Server unavailable');
            } else {
                const data: APIResponse = await response.json();
                return data;
            }
        } catch {
            console.error('Something went wrong');
        }
    }
}
