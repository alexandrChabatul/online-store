import { SearchService } from 'services/SearchService';
import {
    expectedArray,
    expectedBrandArray,
    expectedCategoryArray,
    expectedDescriptionArray,
    expectedDiscountArray,
    expectedPriceArray,
    expectedRatingArray,
    expectedStockArray,
    expectedTitleArray,
    expectedCurrentPriceArray,
} from './test-data/expectedSearch';
import { initialArray } from './test-data/initialData';

describe('getSearchTerm and setSearchTerm methods', () => {
    const searchService = new SearchService();

    beforeEach(() => {
        searchService.setSearchTerm('');
    });

    it('should be defined', () => {
        expect(searchService.getSearchTerm).toBeDefined();
        expect(searchService.setSearchTerm).toBeDefined();
    });

    it('should return initial value', () => {
        expect(searchService.getSearchTerm()).toBe('');
    });

    it('should return changed value', () => {
        searchService.setSearchTerm('new search');
        expect(searchService.getSearchTerm()).toBe('new search');
    });
});

describe('getSearchResults method', () => {
    const searchService = new SearchService();
    const startValue = initialArray;

    beforeEach(() => {
        searchService.setSearchTerm('');
    });

    it('should be defined', () => {
        expect(searchService.getSearchResults).toBeDefined();
    });

    it('should return unchanged array if search input is empty', () => {
        searchService.setSearchTerm('');
        const filteredPoducts = searchService.getSearchResults(startValue);
        expect(filteredPoducts).toStrictEqual(expectedArray);
    });

    it('should return products with term included in brand', () => {
        searchService.setSearchTerm('apple');
        const filteredPoducts = searchService.getSearchResults(startValue);
        expect(filteredPoducts).toStrictEqual(expectedBrandArray);
    });

    it('should return products with term included in category', () => {
        searchService.setSearchTerm('groceries');
        const filteredPoducts = searchService.getSearchResults(startValue);
        expect(filteredPoducts).toStrictEqual(expectedCategoryArray);
    });

    it('should return products with term included in description', () => {
        searchService.setSearchTerm('cereals muesli');
        const filteredPoducts = searchService.getSearchResults(startValue);
        expect(filteredPoducts).toStrictEqual(expectedDescriptionArray);
    });

    it('should return products with term included in discount percentage', () => {
        searchService.setSearchTerm('12.96');
        const filteredPoducts = searchService.getSearchResults(startValue);
        expect(filteredPoducts).toStrictEqual(expectedDiscountArray);
    });

    it("shouldn't return products with term included in id", () => {
        const searchTerm = String(initialArray[3].id);
        searchService.setSearchTerm(searchTerm);
        const filteredPoducts = searchService.getSearchResults(startValue);
        expect(filteredPoducts).toStrictEqual([]);
    });

    it("shouldn't return products with term included in images", () => {
        searchService.setSearchTerm('firebasestorage');
        const filteredPoducts = searchService.getSearchResults(startValue);
        expect(filteredPoducts).toStrictEqual([]);
    });

    it("shouldn't return products with term included in thumbnail", () => {
        searchService.setSearchTerm('dummyjson');
        const filteredPoducts = searchService.getSearchResults(startValue);
        expect(filteredPoducts).toStrictEqual([]);
    });

    it('should return products with term included in price', () => {
        searchService.setSearchTerm('1249');
        const filteredPoducts = searchService.getSearchResults(startValue);
        expect(filteredPoducts).toStrictEqual(expectedPriceArray);
    });

    it('should return products with term included in rating', () => {
        searchService.setSearchTerm('4.94');
        const filteredPoducts = searchService.getSearchResults(startValue);
        expect(filteredPoducts).toStrictEqual(expectedRatingArray);
    });

    it('should return products with term included in stock', () => {
        searchService.setSearchTerm('36');
        const filteredPoducts = searchService.getSearchResults(startValue);
        expect(filteredPoducts).toStrictEqual(expectedStockArray);
    });

    it('should return products with term included in title', () => {
        searchService.setSearchTerm('universe 9');
        const filteredPoducts = searchService.getSearchResults(startValue);
        expect(filteredPoducts).toStrictEqual(expectedTitleArray);
    });

    it('should return products with term included in current price', () => {
        searchService.setSearchTerm('800');
        const filteredPoducts = searchService.getSearchResults(startValue);
        expect(filteredPoducts).toStrictEqual(expectedCurrentPriceArray);
    });

    it("shouldn't return products with term included in isInCart", () => {
        searchService.setSearchTerm('false');
        const filteredPoducts = searchService.getSearchResults(startValue);
        expect(filteredPoducts).toStrictEqual([]);
    });
});
