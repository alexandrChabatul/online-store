import { NewElement } from '../../../utils/element-generator';
import './rating.scss';

class Rating {
    static getRatingBlock(rating: number) {
        const ratingBlock = NewElement.createDivElement('rating');
        const ratingBody = NewElement.createDivElement('rating__body');
        ratingBody.textContent = '★★★★★';
        const ratingActive = NewElement.createDivElement('rating__active');
        ratingActive.textContent = '★★★★★';
        ratingActive.style.width = `${Math.ceil((rating * 100) / 5)}%`;
        const ratingValue = NewElement.createDivElement('rating__value');
        ratingValue.textContent = String(rating);
        ratingBlock.append(ratingBody, ratingValue);
        ratingBody.append(ratingActive);

        return ratingBlock;
    }
}

export default Rating;
