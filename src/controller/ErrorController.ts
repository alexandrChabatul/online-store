import { IController, params } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Footer } from 'view/common-components/footer/footer';
import { Header } from 'view/common-components/header/header';
import ErrorPage from 'view/pages/404/404View';

export default class ErrorController implements IController {
    header: Header;
    main: HTMLElement;
    footer: Footer;
    view: ErrorPage;

    constructor() {
        this.header = new Header(String(4), String(1000));
        this.main = ElementsFactory.createBaseElement('main', 'main');
        this.footer = new Footer();
        this.view = new ErrorPage();
    }

    render(params: params): void {
        const app = <HTMLDivElement>document.getElementById('app');
        app.innerHTML = '';
        this.main.innerHTML = '';
        app.append(this.header.createHeader(), this.main, this.footer.createFooter());
        this.main.append(this.view.render());
    }
}
