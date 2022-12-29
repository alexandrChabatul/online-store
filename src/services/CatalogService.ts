import { ProductResponse, params, Product, IMainParameters } from 'common/types';
import CatalogModel from 'model/CatalogModel';
import { FilterService } from './FilterService';

export class CatalogService {
    model: CatalogModel;
    filterService: FilterService;

    constructor() {
        this.model = CatalogModel.getInstance();
        this.filterService = new FilterService();
    }

    getFilters(params: params) {
        const mainFilters: IMainParameters = {
            filters: {
                category: [
                    {
                        filter: 'smartphones',
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'laptops',
                        checked: true,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'fragrances',
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'skincare',
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                ],
                brand: [
                    {
                        filter: 'Apple',
                        checked: true,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'Samsung',
                        checked: true,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'OPPO',
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'Huawei',
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'Infinix',
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'Motorola',
                        checked: true,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'Xiaomi',
                        checked: true,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'Bork',
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                ],
                stock: {
                    min: 10,
                    max: 3000,
                },
                price: {
                    min: 10,
                    max: 3000,
                },
            },
            sort: 'sort',
            view: 'row',
            search: 'dummy',
        };

        return mainFilters;
    }

    public async getProducts() {
        const products: ProductResponse[] = await this.model.getProducts();
        const productsWithPrice: Product[] = products.map((el) => {
            const currentPrice = Math.ceil(el.price * (100 - el.discountPercentage)) / 100;
            return Object.assign(el, { currentPrice: currentPrice });
        });
        const tempfilters = this.filterService.createFilters(productsWithPrice);
        // const filtered: Product[] = SearchService.getSearchResults(productsWithPrice, catalogSettings.search);
        // const byCategory = FilterService.getFilteredProducts(productsWithPrice, catalogSettings.filters);

        return productsWithPrice;
    }
}
