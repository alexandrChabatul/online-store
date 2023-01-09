import { Product } from 'common/types';
import { ElementsFactory } from 'utils/ElementGenerator';

export class Search {
    search: HTMLInputElement;
    results: HTMLElement;

    constructor() {
        this.search = ElementsFactory.createInputText('search', 'Search product');
        this.results = ElementsFactory.createBaseElementWithText('span', 'search-results-content', ``);
    }

    public createSearchResultsBlock(data: Product[]): HTMLDivElement {
        const searchResults = ElementsFactory.createDivElement('search-results');
        const searchResultsTitle = ElementsFactory.createBaseElementWithText('span', 'search-results-title', 'Found: ');
        this.results.textContent = String(data.length);
        searchResults.append(searchResultsTitle, this.results);

        return searchResults;
    }

    public createSearch(searchInput: string): HTMLInputElement {
        this.search.value = searchInput;
        console.log(this.search.value);
        return this.search;
    }

    public updateSearchResults(results: number): void {
        this.results.textContent = String(results);
    }
}
