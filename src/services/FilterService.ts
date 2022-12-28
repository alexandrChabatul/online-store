import { Product } from 'common/types';
import { IFilters } from 'common/types';

export class FilterService {
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
