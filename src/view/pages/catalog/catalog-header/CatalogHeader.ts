import { ICatalogSettings, Product } from 'common/types';
import { ElementsFactory } from 'utils/ElementGenerator';
import { Search } from './search/Search';
import { Sort } from './sorting/Sorting';
import './catalog-header.scss';
import { ViewBlock } from './view-block/ViewBlock';

export class CatalogHeader {
    sortMethod: Sort;
    search: Search;
    viewBlockElement: ViewBlock;
    catalogHeader: HTMLDivElement;
    filterButton: HTMLDivElement;

    constructor() {
        this.catalogHeader = ElementsFactory.createDivElement('top-panel');
        this.sortMethod = new Sort();
        this.search = new Search();
        this.viewBlockElement = new ViewBlock();
        this.filterButton = ElementsFactory.createDivElement('filter-icon');
    }

    createCatalogHeader(data: Product[], filters: ICatalogSettings): HTMLElement {
        this.catalogHeader.innerHTML = '';
        const sortMethod = this.sortMethod.createSortBlock(filters.sort);
        const searchResults = this.search.createSearchResultsBlock(data);
        const searchField = this.search.createSearch(filters.search);
        const viewBlock = this.viewBlockElement.createViewBlock(filters.view);
        this.catalogHeader.append(sortMethod, searchResults, searchField, viewBlock, this.filterButton);

        return this.catalogHeader;
    }
}
