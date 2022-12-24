import { Product } from '../../../../../common/types';
import { NewElement } from './../../../../../utils/element-generator';

export class Search {
    search: HTMLInputElement;
    results: HTMLElement;

    constructor() {
        this.search = NewElement.createInputText('search', 'Search product');
        this.results = NewElement.createBaseElementWithText('span', 'search-results-content', ``);
    }

    public createSearchResultsBlock(data: Product[]): HTMLDivElement {
        const searchResults = NewElement.createDivElement('search-results');
        const searchResultsTitle = NewElement.createBaseElementWithText('span', 'search-results-title', 'Found: ');
        this.results.textContent = String(data.length);
        searchResults.append(searchResultsTitle, this.results);

        return searchResults;
    }

    public createSearch(searchInput: string): HTMLInputElement {
        this.search.value = searchInput;
        return this.search;
    }

    public updateSearchResults(results: number): void {
        this.results.textContent = String(results);
    }
}
