import { ElementsFactory } from 'utils/ElementGenerator';
import './404.scss';

class ErrorPage {
    render() {
        const container = ElementsFactory.createDivElement('wrapper wrapper-404');
        const image = ElementsFactory.createDivElement('image-404');
        const message = ElementsFactory.createBaseElementWithText(
            'p',
            'message-404',
            "We can't find the page you're looking for."
        );
        container.append(image, message);
        return container;
    }
}

export default ErrorPage;
