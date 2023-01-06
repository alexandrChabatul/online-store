import { ProductIsInCart } from 'common/types';

export class SearchService {
    private searchTerm: string;

    constructor() {
        this.searchTerm = '';
    }

    setSearchTerm(search: string) {
        if (search) {
            this.searchTerm = search;
        } else {
            this.searchTerm = '';
        }
    }

    getSearchTerm() {
        return this.searchTerm;
    }

    getSearchResults(products: ProductIsInCart[]): ProductIsInCart[] {
        const productsWithSearchAplied = products.filter((el: ProductIsInCart): ProductIsInCart | undefined => {
            const objCopy: { [key: string]: boolean | string | number | string[] } = { ...el };
            ['id', 'thumbnail', 'images'].forEach((element) => {
                delete objCopy[element];
            });
            for (const key in objCopy) {
                if (objCopy[key].toString().toLowerCase().includes(this.searchTerm.toLowerCase())) {
                    return el;
                }
            }
        });
        return productsWithSearchAplied;
    }
}
