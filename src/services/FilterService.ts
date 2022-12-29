import { IFilter, IRange, Product, tempIFilters, tempType } from 'common/types';
import { IFilters } from 'common/types';

export class FilterService {
    filters: tempIFilters;
    categories: tempType;
    brands: tempType;
    stock: IRange;
    price: IRange;

    constructor() {
        this.categories = {};
        this.brands = {};
        this.stock = {
            min: 10000000000,
            max: 0,
        };
        this.price = {
            min: 10000000000,
            max: 0,
        };
        this.filters = {
            category: {},
            brand: {},
            stock: {
                min: 0,
                max: 0,
            },
            price: {
                min: 100000000000,
                max: 0,
            },
        };
    }

    createFilters(products: Product[]): IFilters {
        products.forEach((product: Product) => {
            if (this.categories[product.category.toLowerCase()]) {
                this.categories[product.category.toLowerCase()].total++;
            } else {
                Object.defineProperty(this.categories, product.category.toLowerCase(), {
                    value: {
                        filter: product.category.toLowerCase(),
                        total: 1,
                        active: 0,
                        checked: false,
                    },
                });
            }

            if (this.brands[product.brand.toLowerCase()]) {
                this.brands[product.brand.toLowerCase()].total++;
            } else {
                Object.defineProperty(this.brands, product.brand.toLowerCase(), {
                    value: {
                        filter: product.brand.toLowerCase(),
                        total: 1,
                        active: 0,
                        checked: false,
                    },
                });
            }

            if (this.price.min > product.currentPrice) {
                this.price.min = product.currentPrice;
            }

            if (this.price.max < product.currentPrice) {
                this.price.max = product.currentPrice;
            }

            if (this.stock.min > product.stock) {
                this.stock.min = product.stock;
            }

            if (this.stock.max < product.stock) {
                this.stock.max = product.stock;
            }
        });

        return {
            category: Object.values(this.categories),
            brand: Object.values(this.brands),
            stock: {
                min: 0,
                max: 0,
            },
            price: {
                min: 0,
                max: 0,
            },
        };
    }

    public changeFilter(type: 'brands' | 'categories', name: string) {
        this[type][name] != this[type][name];
    }

    public changeRange(type: 'stock' | 'price', border: 'min' | 'max', value: number) {
        this[type][border] = value;
    }

    static getFilteredProducts(products: Product[], filters: IFilters): Product[] {
        const filteredByBrandProducts = this.getFiltered(products, 'brand', filters);
        const filteredByCategoryProducts = this.getFiltered(filteredByBrandProducts, 'category', filters);
        const filteredByStock = this.getRanged(filteredByCategoryProducts, 'stock', filters);
        const filteredByPrice = this.getRanged(filteredByStock, 'price', filters);
        return filteredByPrice;
    }

    private static getFiltered(products: Product[], type: 'brand' | 'category', filters: IFilters): Product[] {
        const activeFilters = filters[type].filter((el) => el.checked === true);
        const filteredProducts: Product[] = [];
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

    private static getRanged(products: Product[], type: 'stock' | 'price', filters: IFilters) {
        const minRange = filters[type].min;
        const maxRange = filters[type].max;
        return products.filter((el) => el[type] >= minRange && el[type] <= maxRange);
    }
}
