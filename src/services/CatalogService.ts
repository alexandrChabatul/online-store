import { ProductResponse, params, ICatalogSettings, ProductIsInCart } from 'common/types';
import CartModel from 'model/CartModel';
import CatalogModel from 'model/CatalogModel';
import { FilterService } from './FilterService';
import MappingService from './MappingService';
import { SearchService } from './SearchService';
import { SortService } from './SortService';
import { ViewService } from './ViewService';

export class CatalogService {
    model: CatalogModel;
    filterService: FilterService;
    sortService: SortService;
    searchService: SearchService;
    viewService: ViewService;
    mapper: MappingService;
    cart: CartModel;

    constructor() {
        this.model = CatalogModel.getInstance();
        this.filterService = new FilterService();
        this.sortService = new SortService();
        this.searchService = new SearchService();
        this.viewService = new ViewService();
        this.mapper = new MappingService();
        this.cart = CartModel.getInstance();
    }

    public getCatalogSettings(params: params): ICatalogSettings {
        const { category, brand, price, stock, sort, search, view } = params;
        return {
            filters: this.filterService.getFilters(category, brand, stock, price),
            sort: this.sortService.getSortMethod(sort),
            search: this.searchService.getSearchTerm(search),
            view: this.viewService.getViewType(view),
        };
    }

    public getAllProducts(): ProductIsInCart[] {
        const products: ProductResponse[] = this.model.getProducts();
        const mappedProducts: ProductIsInCart[] = products.map((el) => this.mapper.mapFromProductToProductIsInCart(el));
        return mappedProducts;
    }

    public getFilteredProducts(params: params): ProductIsInCart[] {
        const products: ProductIsInCart[] = this.getAllProducts();
        this.filterService.createFilters(products, params);
        const filters = this.getCatalogSettings(params);
        const filteredProducts = this.filterService.getFilteredProducts(products, filters.filters);
        const searchedProducts = this.searchService.getSearchResults(filteredProducts);
        const sortedProducts = this.sortService.getSortedResults(searchedProducts);
        this.filterService.countActiveFilters(sortedProducts, params);
        return sortedProducts;
    }
}
