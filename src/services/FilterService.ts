import { IRange, params, Product, ProductIsInCart, FilterStored } from 'common/types';
import { IFilters } from 'common/types';
import appConstants from 'common/constants';

export class FilterService {
    categories: FilterStored;
    brands: FilterStored;
    stock: IRange;
    currentPrice: IRange;

    constructor() {
        this.categories = {};
        this.brands = {};
        this.stock = {
            min: 0,
            minValue: 0,
            max: 0,
            maxValue: 0,
        };
        this.currentPrice = {
            min: 0,
            minValue: 0,
            max: 0,
            maxValue: 0,
        };
    }

    public getFilters() {
        return {
            category: Object.values(this.categories),
            brand: Object.values(this.brands),
            stock: this.stock,
            currentPrice: this.currentPrice,
        };
    }

    createFilters(products: ProductIsInCart[], params: params) {
        this.currentPrice.min = products[0].price;
        this.currentPrice.max = products[0].price;
        this.stock.min = products[0].stock;
        this.stock.max = products[0].stock;

        this.categories = {};
        this.brands = {};
        products.forEach((product: Product) => {
            this.categories[product.category.toLowerCase()]
                ? this.categories[product.category.toLowerCase()].total++
                : Object.defineProperty(this.categories, product.category.toLowerCase(), {
                      value: {
                          filter: product.category.toLowerCase(),
                          total: 1,
                          active: 0,
                          checked: false,
                      },
                      enumerable: true,
                      configurable: true,
                      writable: true,
                  });

            this.brands[product.brand.toLowerCase()]
                ? this.brands[product.brand.toLowerCase()].total++
                : Object.defineProperty(this.brands, product.brand.toLowerCase(), {
                      value: {
                          filter: product.brand.toLowerCase(),
                          total: 1,
                          active: 0,
                          checked: false,
                      },
                      enumerable: true,
                      configurable: true,
                      writable: true,
                  });

            this.currentPrice.min = Math.min(this.currentPrice.min, Math.floor(product.currentPrice));
            this.currentPrice.max = Math.max(this.currentPrice.max, Math.ceil(product.currentPrice));
            this.stock.min = Math.min(this.stock.min, product.stock);
            this.stock.max = Math.max(this.stock.max, product.stock);
        });

        this.currentPrice.maxValue = this.currentPrice.max;
        this.currentPrice.minValue = this.currentPrice.min;
        this.stock.minValue = this.stock.min;
        this.stock.maxValue = this.stock.max;

        const { category, brand, stock, price } = params;
        this.activateAllFilters(category, brand, price, stock);
    }

    public activateAllFilters(category: string, brand: string, price: string, stock: string) {
        this.activateCheckboxFilters('categories', category);
        this.activateCheckboxFilters('brands', brand);
        this.activateRangeFilters('stock', stock);
        this.activateRangeFilters('currentPrice', price);
    }

    private activateCheckboxFilters(type: 'categories' | 'brands', params: string) {
        if (params) {
            const paramsArray = params.split(appConstants.paramsDelimeter);
            paramsArray.forEach((el) => {
                const decodedEl = decodeURIComponent(el.toLowerCase()).replace(/\+/gi, ' ');
                if (this[type][decodedEl]) {
                    this[type][decodedEl].checked = true;
                }
            });
        } else {
            for (const filter in this[type]) {
                this[type][filter].checked = false;
            }
        }
    }

    private activateRangeFilters(type: 'stock' | 'currentPrice', params: string) {
        if (params) {
            const paramsArray = params.split(appConstants.paramsDelimeter);
            this[type].minValue = Number(paramsArray[0]);
            if (paramsArray[1]) {
                this[type].maxValue = Number(paramsArray[1]);
            }
        }
    }

    public countActiveFilters(filteredProducts: ProductIsInCart[], params: params) {
        if (filteredProducts.length > 0) {
            let filteredProductsMinPrice = filteredProducts[0].currentPrice;
            let filteredProductsMaxPrice = filteredProducts[0].currentPrice;
            let filteredProductsMinStock = filteredProducts[0].stock;
            let filteredProductsMaxStock = filteredProducts[0].stock;

            filteredProducts.forEach((el) => {
                this.categories[el.category.toLowerCase()].active++;
                this.brands[el.brand.toLowerCase()].active++;

                filteredProductsMinPrice = Math.min(filteredProductsMinPrice, Math.floor(el.currentPrice));
                filteredProductsMaxPrice = Math.max(filteredProductsMaxPrice, Math.ceil(el.currentPrice));
                filteredProductsMinStock = Math.min(filteredProductsMinStock, el.stock);
                filteredProductsMaxStock = Math.max(filteredProductsMaxStock, el.stock);
            });

            if (!('price' in params)) {
                this.currentPrice.minValue = filteredProductsMinPrice;
                this.currentPrice.maxValue = filteredProductsMaxPrice;
            }

            if (!('stock' in params)) {
                this.stock.minValue = filteredProductsMinStock;
                this.stock.maxValue = filteredProductsMaxStock;
            }
        }
    }

    public getFilteredProducts(products: ProductIsInCart[], filters: IFilters): ProductIsInCart[] {
        const filteredByBrandProducts = this.getFiltered(products, 'brand', filters);
        const filteredByCategoryProducts = this.getFiltered(filteredByBrandProducts, 'category', filters);
        const filteredByStock = this.getRanged(filteredByCategoryProducts, 'stock', filters);
        const filteredByPrice = this.getRanged(filteredByStock, 'currentPrice', filters);
        return filteredByPrice;
    }

    private getFiltered(products: ProductIsInCart[], type: 'brand' | 'category', filters: IFilters): ProductIsInCart[] {
        const activeFilters = filters[type].filter((el) => el.checked === true);
        if (activeFilters.length > 0) {
            const filteredProducts: ProductIsInCart[] = [];
            activeFilters.forEach((el) => {
                const filteredByOneField = products.filter((element) => {
                    if (element[type].toLowerCase() === el.filter.toLowerCase()) {
                        return element;
                    }
                });
                filteredProducts.push(...filteredByOneField);
            });
            return filteredProducts;
        }
        return products;
    }

    private getRanged(products: ProductIsInCart[], type: 'stock' | 'currentPrice', filters: IFilters) {
        const minRange = filters[type].minValue;
        const maxRange = filters[type].maxValue;
        return products.filter((el) => el[type] >= minRange && el[type] <= maxRange);
    }
}
