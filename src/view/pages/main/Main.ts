import { IMainParameters, Product } from '../../../common/types';
import { NewElement } from '../../../utils/element-generator';
import { Footer } from './../../common-components/footer/footer';
import { Header } from './../../common-components/header/header';
import { Catalog } from './catalog/catalog';

class Main {
    header: Header;
    catalog: Catalog;
    footer: Footer;

    constructor() {
        this.header = new Header('10', '1000');
        this.catalog = new Catalog();
        this.footer = new Footer();
    }

    render(params: Product[], filters: IMainParameters) {
        console.log('render main');
        console.log(params);
        const app = <HTMLDivElement>document.getElementById('root');
        // app.textContent = `This id main page!${params}`;
        app.append(this.header.createHeader());
        const main = NewElement.createDivElement('main');
        const mainWrapper = NewElement.createDivElement('wrapper main-wrapper');
        app.append(main);
        main.append(mainWrapper);
        const catalog = this.catalog.createCatalog(params, filters);

        mainWrapper.append(catalog);
        app.append(this.footer.createFooter());
    }
}

export default Main;
