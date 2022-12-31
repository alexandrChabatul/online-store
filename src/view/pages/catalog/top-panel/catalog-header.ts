import { ICatalogSettings, Product } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Search } from './search/search';
import { Sort } from './sorting/sorting';
import './catalog-header.scss';
import { ViewBlock } from './view-block/view-block';

export class CatalogHeader {
    sortMethod: Sort;
    search: Search;
    viewBlockElement: ViewBlock;

    constructor() {
        this.sortMethod = new Sort();
        this.search = new Search();
        this.viewBlockElement = new ViewBlock();
    }

    createCatalogHeader(data: Product[], filters: ICatalogSettings): HTMLElement {
        const catalogHeader = ElementsFactory.createDivElement('top-panel');
        const sortMethod = this.sortMethod.createSortBlock(filters.sort);
        const searchResults = this.search.createSearchResultsBlock(data);
        const searchField = this.search.createSearch(filters.search);
        const viewBlock = this.viewBlockElement.createViewBlock(filters.view);
        catalogHeader.append(sortMethod, searchResults, searchField, viewBlock);

        return catalogHeader;
    }
}
