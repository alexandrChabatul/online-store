import { Product } from 'common/types';

export class SearchService {
    static getSearchResults(products: Product[], term: string): Product[] {
        const productsWithSearchAplied = products.filter((el: Product): Product | undefined => {
            const objCopy: { [key: string]: string | number | string[] } = { ...el };
            ['id', 'thumbnail', 'images'].forEach((element) => {
                delete objCopy[element];
            });
            for (const key in objCopy) {
                if (objCopy[key].toString().toLowerCase().includes(term.toLowerCase())) {
                    return el;
                }
            }
        });
        return productsWithSearchAplied;
    }
}
