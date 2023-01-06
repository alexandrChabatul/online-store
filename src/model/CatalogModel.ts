import { ProductResponse, APIResponse } from 'common/types';
import ApiService from 'services/ApiService';

export default class CatalogModel {
    private static instance: CatalogModel;
    private products: ProductResponse[];
    private apiService: ApiService;

    private constructor() {
        this.products = [];
        this.apiService = new ApiService();
    }

    public static getInstance(): CatalogModel {
        if (!this.instance) {
            this.instance = new CatalogModel();
        }
        return this.instance;
    }

    public async setProducts(): Promise<void> {
        if (this.products.length === 0) {
            const data: APIResponse | undefined = await this.apiService.setProducts();
            if (data) {
                this.products = data;
            }
        }
    }

    public getProducts(): ProductResponse[] {
        return this.products;
    }
}
