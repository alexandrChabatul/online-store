import { IController, params, Product, ProductResponse } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Footer } from 'view/common-components/footer/footer';
import { Header } from 'view/common-components/header/header';
import ProductView from 'view/pages/product/ProductView';
import data from 'assets/tempData/data.json';

export default class ProductController implements IController {
    header: Header;
    main: HTMLElement;
    footer: Footer;
    view: ProductView;

    constructor() {
        this.header = new Header(String(4), String(1000));
        this.main = ElementsFactory.createBaseElement('main', 'main');
        this.footer = new Footer();
        this.view = new ProductView();
    }

    render(params: params): void {
        const app = <HTMLDivElement>document.getElementById('app');
        app.innerHTML = '';
        this.main.innerHTML = '';
        app.append(this.header.createHeader(), this.main, this.footer.createFooter());
        const product: ProductResponse = data.products[33];
        const currentPrice = Math.ceil(product.price * (100 - product.discountPercentage)) / 100;
        const productWithPrice: Product = Object.assign(product, { currentPrice: currentPrice });
        const productBlock = this.view.render(productWithPrice);
        this.main.append(productBlock);
    }
}
