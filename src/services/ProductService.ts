import { BadResponse, Product } from 'common/types';
import ApiService from './ApiService';
import MappingService from './MappingService';

export default class ProductService {
    apiService: ApiService;
    mapper: MappingService;

    constructor() {
        this.apiService = new ApiService();
        this.mapper = new MappingService();
    }

    async getProduct(id: string): Promise<Product | BadResponse> {
        const response = await this.apiService.getProduct(id);
        if ('errorMessage' in response) {
            return response as BadResponse;
        }
        const product = this.mapper.mapFromProductResponseToProduct(response);
        return product;
    }
}
