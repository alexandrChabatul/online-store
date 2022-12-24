import { Product } from '../../../../../common/types';
import { NewElement } from './../../../../../utils/element-generator';

export class Sort {
    sort: HTMLSelectElement;

    constructor() {
        this.sort = NewElement.createSelect('sort-method');
    }

    createSortBlock(data: Product[], sort: string): HTMLSelectElement {
        const defaultOption = NewElement.createOPtion('sort-option', 'Sort', 'Sort');
        defaultOption.disabled = true;
        const sortPriceASC = NewElement.createOPtion('sort-option', 'price ASC', 'Price (Low-High)');
        const sortPriceDESC = NewElement.createOPtion('sort-option', 'price DESC', 'Price (High-Low)');
        const sortRatingASC = NewElement.createOPtion('sort-option', 'rating ASC', 'Rating (Low-High)');
        const sortRatingDESC = NewElement.createOPtion('sort-option', 'rating DESC', 'Rating (High-Low)');
        const sortDiscountASC = NewElement.createOPtion('sort-option', 'discount ASC', 'Discount (Low-High)');
        const sortDiscountDESC = NewElement.createOPtion('sort-option', 'discount DESC', 'Discount (High-Low)');

        this.selectSortOption(
            defaultOption,
            sortPriceASC,
            sortPriceDESC,
            sortRatingASC,
            sortRatingDESC,
            sortDiscountASC,
            sortDiscountDESC,
            sort
        );

        this.sort.append(
            defaultOption,
            sortPriceASC,
            sortPriceDESC,
            sortRatingASC,
            sortRatingDESC,
            sortDiscountASC,
            sortDiscountDESC
        );

        return this.sort;
    }

    private selectSortOption(
        defaultOption: HTMLOptionElement,
        priceASC: HTMLOptionElement,
        priceDESC: HTMLOptionElement,
        ratingASC: HTMLOptionElement,
        ratingDESC: HTMLOptionElement,
        discountASC: HTMLOptionElement,
        discountDESC: HTMLOptionElement,
        sortMethod: string
    ): void {
        if (sortMethod === 'price ASC') {
            priceASC.selected = true;
        } else if (sortMethod === 'price DESC') {
            priceDESC.selected = true;
        } else if (sortMethod === 'rating ASC') {
            ratingASC.selected = true;
        } else if (sortMethod === 'rating DESC') {
            ratingDESC.selected = true;
        } else if (sortMethod === 'discount ASC') {
            discountASC.selected = true;
        } else if (sortMethod === 'discount DESC') {
            discountDESC.selected = true;
        } else {
            defaultOption.selected = true;
        }
    }
}
