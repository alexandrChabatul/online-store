import { ProductIsInCart } from 'common/types';

export class SortService {
    sortMethod: string;

    constructor() {
        this.sortMethod = 'sort';
    }

    setSortMethod(sortParams: string) {
        if (sortParams) {
            this.sortMethod = sortParams.split('+').join(' ');
        } else {
            this.sortMethod = 'sort';
        }
    }

    getSortMethod() {
        return this.sortMethod;
    }

    getSortedResults(products: ProductIsInCart[]): ProductIsInCart[] {
        const [type, order] = this.sortMethod.split(' ');
        switch (order) {
            case 'ASC':
                return products.sort((a, b) => {
                    const aPseudo: { [key: string]: boolean | string | number | string[] } = { ...a };
                    const bPseudo: { [key: string]: boolean | string | number | string[] } = { ...b };
                    if (typeof aPseudo[type] !== 'number' || typeof bPseudo[type] !== 'number') return 0;
                    return Number(aPseudo[type]) - Number(bPseudo[type]);
                });
            case 'DESC':
                return products.sort((a, b) => {
                    const aPseudo: { [key: string]: boolean | string | number | string[] } = { ...a };
                    const bPseudo: { [key: string]: boolean | string | number | string[] } = { ...b };
                    if (typeof aPseudo[type] !== 'number' || typeof bPseudo[type] !== 'number') return 0;
                    return Number(bPseudo[type]) - Number(aPseudo[type]);
                });
        }
        return products;
    }
}
