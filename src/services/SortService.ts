import { Product } from 'common/types';

export class SortService {
    static getSortedResults(products: Product[], sortType: string): Product[] {
        const [type, order] = sortType.split(' ');
        switch (order) {
            case 'ASC':
                return products.sort((a, b) => {
                    const aPseudo: { [key: string]: string | number | string[] } = { ...a };
                    const bPseudo: { [key: string]: string | number | string[] } = { ...b };
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
                    const aPseudo: { [key: string]: string | number | string[] } = { ...a };
                    const bPseudo: { [key: string]: string | number | string[] } = { ...b };
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
