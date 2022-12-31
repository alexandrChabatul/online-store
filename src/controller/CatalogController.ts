import { IController, params } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Footer } from 'view/common-components/footer/footer';
import { Header } from 'view/common-components/header/header';
import CatalogView from 'view/pages/catalog/CatalogView';
import { CatalogService } from 'services/CatalogService';

export default class CatalogController implements IController {
    header: Header;
    main: HTMLElement;
    footer: Footer;
    view: CatalogView;
    catalogService: CatalogService;

    constructor() {
        this.header = new Header(String(4), String(1000));
        this.main = ElementsFactory.createBaseElement('main', 'main');
        this.footer = new Footer();
        this.view = new CatalogView();
        this.catalogService = new CatalogService();
    }

    async render(params: params): Promise<void> {
        const app = <HTMLDivElement>document.getElementById('app');
        app.innerHTML = '';
        this.main.innerHTML = '';
        const header = this.header.createHeader();
        const footer = this.footer.createFooter();
        app.append(header, this.main, footer);

        await this.catalogService.model.setProducts();
        const products = this.catalogService.getProducts(params);
        const catalogSettings = this.catalogService.getCatalogSettings(params);

        const catalog = this.view.render(products, catalogSettings);
        this.main.append(catalog);

        this.view.catalogHeader.viewBlockElement.viewBlock.addEventListener('click', (e) => {
            const target: EventTarget | null = e.target;
            if (target instanceof HTMLDivElement) {
                if (target.className.includes('row')) {
                    catalogSettings.view = 'row';
                } else if (target.className.includes('table')) {
                    catalogSettings.view = 'table';
                }
                this.view.products.setView(catalogSettings.view);
                this.view.catalogHeader.viewBlockElement.setView(catalogSettings.view);
            }
        });
        this.view.filters.resetBlock.copyButton.addEventListener(
            'click',
            this.view.filters.resetBlock.applyCopiedState.bind(this.view.filters.resetBlock)
        );
    }
}
