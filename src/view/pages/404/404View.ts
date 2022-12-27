import { ElementsFactory } from 'utils/element-generator';
import { Footer } from '../../common-components/footer/footer';
import { Header } from '../../common-components/header/header';
import './404.scss';

class ErrorPage {
    header: Header;
    footer: Footer;

    constructor() {
        this.header = new Header('4', '300');
        this.footer = new Footer();
    }

    render() {
        const app = <HTMLDivElement>document.getElementById('root');
        const header = this.header.createHeader();
        const main = ElementsFactory.createBaseElement('main', 'main');
        const container = ElementsFactory.createDivElement('wrapper wrapper-404');
        const image = ElementsFactory.createDivElement('image-404');
        const message = ElementsFactory.createBaseElementWithText(
            'p',
            'message-404',
            "We can't find the page you're looking for."
        );
        const footer = this.footer.createFooter();
        app.append(header, main, footer);
        main.append(container);
        container.append(image, message);
        // app.textContent = 'Page not found. 404!';
    }
}

export default ErrorPage;
