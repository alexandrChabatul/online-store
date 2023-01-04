import { ProductIsInCart } from 'common/types';

export class SortService {
    sortMethod: string;

    constructor() {
        this.sortMethod = 'sort';
    }

    setSortMethod(value: string) {
        this.sortMethod = value;
    }

    getSortMethod(sortParams: string) {
        if (sortParams) {
            this.setSortMethod(sortParams.split('+').join(' '));
        } else {
            this.setSortMethod('sort');
        }
        return this.sortMethod;
    }

    getSortedResults(products: ProductIsInCart[]): ProductIsInCart[] {
        const [type, order] = this.sortMethod.split(' ');
        switch (order) {
            case 'ASC':
                return products.sort((a, b) => {
                    const aPseudo: { [key: string]: boolean | string | number | string[] } = { ...a };
                    const bPseudo: { [key: string]: boolean | string | number | string[] } = { ...b };
                    if (aPseudo[type] > bPseudo[type]) {
                        return 1;
                    }

                    if (aPseudo[type] < bPseudo[type]) {
                        return -1;
                    }

                    return 0;
                });
            case 'DESC':
                return products.sort((a, b) => {
                    const aPseudo: { [key: string]: boolean | string | number | string[] } = { ...a };
                    const bPseudo: { [key: string]: boolean | string | number | string[] } = { ...b };
                    if (aPseudo[type] > bPseudo[type]) {
                        return -1;
                    }

                    if (aPseudo[type] < bPseudo[type]) {
                        return 1;
                    }

                    return 0;
                });
        }
        return products;
    }
}
