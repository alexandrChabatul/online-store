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

    public setCatalogSettings(params: params): void {
        const { category, brand, price, stock, sort, search, view } = params;
        this.filterService.activateAllFilters(category, brand, price, stock);
        this.sortService.setSortMethod(sort);
        this.searchService.setSearchTerm(search);
        this.viewService.setViewType(view);
    }

    public getCatalogSettings(): ICatalogSettings {
        return {
            filters: this.filterService.getFilters(),
            sort: this.sortService.getSortMethod(),
            search: this.searchService.getSearchTerm(),
            view: this.viewService.getViewType(),
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
        this.setCatalogSettings(params);
        const filters = this.getCatalogSettings();
        const filteredProducts = this.filterService.getFilteredProducts(products, filters.filters);
        const searchedProducts = this.searchService.getSearchResults(filteredProducts);
        const sortedProducts = this.sortService.getSortedResults(searchedProducts);
        this.filterService.countActiveFilters(sortedProducts, params);
        return sortedProducts;
    }
}
