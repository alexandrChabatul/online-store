import { ElementsFactory } from 'utils/element-generator';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import './base-page.scss';

export default class BasePage {
    private static instance: BasePage;
    private header: Header;
    private main: HTMLElement;
    private footer: Footer;

    private constructor() {
        this.header = new Header();
        this.main = ElementsFactory.createBaseElement('main', 'main');
        this.footer = new Footer();
    }

    public static getInstance(): BasePage {
        if (!this.instance) {
            this.instance = new BasePage();
        }
        return this.instance;
    }

    getHeader() {
        return this.header.createHeader();
    }

    getFooter() {
        return this.footer.createFooter();
    }

    getMain() {
        return this.main;
    }

    updateHeader(counter: string, total: string) {
        this.header.updateCart(counter, total);
    }

    updateMain(wrapper: HTMLElement) {
        this.main.innerHTML = '';
        this.main.append(wrapper);
    }
}
