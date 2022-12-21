import { NewElement } from '../../../../utils/element-generator';
import Rating from '../../../common-components/rating/Rating';
import './product-title.scss';

class ProductTitle {
    getProductTitle(title: string, rating: number) {
        const titleAndRating = NewElement.createDivElement('title-rating');
        const titleBlock = NewElement.createBaseElementWithText(
            'p',
            'title-rating__title',
            title[0].toUpperCase() + title.slice(1)
        );
        const ratingBlock = Rating.getRatingBlock(rating);
        titleAndRating.append(titleBlock, ratingBlock);
        return titleAndRating;
    }
}

export default ProductTitle;
