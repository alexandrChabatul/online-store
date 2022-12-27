import { ElementsFactory } from '../../../utils/element-generator';
import './rating.scss';

class Rating {
    static getRatingBlock(rating: number) {
        const ratingBlock = ElementsFactory.createDivElement('rating');
        const ratingBody = ElementsFactory.createDivElement('rating__body');
        ratingBody.textContent = '★★★★★';
        const ratingActive = ElementsFactory.createDivElement('rating__active');
        ratingActive.textContent = '★★★★★';
        ratingActive.style.width = `${Math.ceil((rating * 100) / 5)}%`;
        const ratingValue = ElementsFactory.createDivElement('rating__value');
        ratingValue.textContent = String(rating);
        ratingBlock.append(ratingBody, ratingValue);
        ratingBody.append(ratingActive);

        return ratingBlock;
    }
}

export default Rating;
