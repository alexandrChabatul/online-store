import { ProductIsInCart } from "common/types";
import { SortService } from "services/SortService";
import {
    unsortedArray,
    sortedByPriceAscArray,
    sortedByPriceDescArray,
    sortedByDiscountAscArray,
    sortedByDiscountDescArray,
    sortedByRatingAscArray,
    sortedByRatingDescArray
} from './expected-sort';
import { initialArray } from "./initialData";

describe('getSearchTerm and setSearchTerm methods', () => {
    const sortService = new SortService();

    beforeEach(() => {
        sortService.setSortMethod('');
    });

    it('should be defined', () => {
        expect(sortService.getSortMethod).toBeDefined();
        expect(sortService.setSortMethod).toBeDefined();
    });

    it('should return initial value', () => {
        expect(sortService.getSortMethod()).toBe('sort');
    });

    it('should return changed value', () => {
        sortService.setSortMethod('Rating+ASC');
        expect(sortService.getSortMethod()).toBe('Rating ASC');
    });

    it('should return reset value if empty string is passed', () => {
        sortService.setSortMethod('value');
        expect(sortService.getSortMethod()).toBe('value');
        sortService.setSortMethod('');
        expect(sortService.getSortMethod()).toBe('sort');
    });
});

describe('getSortedResults method', () => {
    const sortService = new SortService();
    let startValue: ProductIsInCart[];

    beforeEach(() => {
        sortService.setSortMethod('');
        startValue = Array.from(initialArray);
    });

    it('should be defined', () => {
        expect(sortService.getSortedResults).toBeDefined();
    });

    it('should return unsorted products if sort method is not defined', () => {
        const result = unsortedArray;
        expect(sortService.getSortedResults(startValue)).toStrictEqual(result);
    });

    it('should return products sorted by price ASC', () => {
        const result = sortedByPriceAscArray;
        sortService.setSortMethod('currentPrice+ASC');
        expect(sortService.getSortedResults(startValue)).toStrictEqual(result);
    });

    it('should return products sorted by price DESC', () => {
        const result = sortedByPriceDescArray;
        sortService.setSortMethod('currentPrice+DESC');
        expect(sortService.getSortedResults(startValue)).toStrictEqual(result);
    });

    it('should return products sorted by discount ASC', () => {
        const result = sortedByDiscountAscArray;
        sortService.setSortMethod('discountPercentage+ASC');
        expect(sortService.getSortedResults(startValue)).toStrictEqual(result);
    });

    it('should return products sorted by discount DESC', () => {
        const result = sortedByDiscountDescArray;
        sortService.setSortMethod('discountPercentage+DESC');
        expect(sortService.getSortedResults(startValue)).toStrictEqual(result);
    });

    it('should return products sorted by rating ASC', () => {
        const result = sortedByRatingAscArray;
        sortService.setSortMethod('rating+ASC');
        expect(sortService.getSortedResults(startValue)).toStrictEqual(result);
    });

    it('should return products sorted by rating DESC', () => {
        const result = sortedByRatingDescArray;
        sortService.setSortMethod('rating+DESC');
        expect(sortService.getSortedResults(startValue)).toStrictEqual(result);
    });

    it('should return unsorted products if parameter couldn\'t be splitted', () => {
        const result = unsortedArray;
        sortService.setSortMethod('ratingDESC');
        expect(sortService.getSortedResults(startValue)).toStrictEqual(result);
    });

    it('should return unsorted products if parameter doesn\'t match product parameters', () => {
        const result = unsortedArray;
        sortService.setSortMethod('value DESC');
        expect(sortService.getSortedResults(startValue)).toStrictEqual(result);
    });

    it('should return unsorted products if sorting order doesn\'t match predefined variants', () => {
        const result = unsortedArray;
        sortService.setSortMethod('rating+DES');
        expect(sortService.getSortedResults(startValue)).toStrictEqual(result);
    });

    it('should return unsorted products if parameter value is not a number', () => {
        const result = unsortedArray;
        sortService.setSortMethod('title+DESC');
        expect(sortService.getSortedResults(startValue)).toStrictEqual(result);
    });
});
