import { IController, IMainParameters, params, Product, ProductResponse } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Footer } from 'view/common-components/footer/footer';
import { Header } from 'view/common-components/header/header';
import CatalogView from 'view/pages/catalog/CatalogView';
import data from 'assets/tempData/data.json';
import { SearchService } from '../services/SearchService';
import { FilterService } from 'services/FilterService';

export default class CatalogController implements IController {
    header: Header;
    main: HTMLElement;
    footer: Footer;
    view: CatalogView;

    constructor() {
        this.header = new Header(String(4), String(1000));
        this.main = ElementsFactory.createBaseElement('main', 'main');
        this.footer = new Footer();
        this.view = new CatalogView();
    }

    render(params: params): void {
        console.log('render');
        const app = <HTMLDivElement>document.getElementById('app');
        app.innerHTML = '';
        this.main.innerHTML = '';
        app.append(this.header.createHeader(), this.main, this.footer.createFooter());
        const mainFilters: IMainParameters = {
            filters: {
                category: [
                    {
                        filter: 'smartphones',
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'laptops',
                        checked: true,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'laptops',
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'laptops',
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                ],
                brand: [
                    {
                        filter: 'Apple',
                        checked: true,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'Samsung',
                        checked: true,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'OPPO',
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'Huawei',
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'Infinix',
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'Motorola',
                        checked: true,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'Xiaomi',
                        checked: true,
                        active: 5,
                        total: 5,
                    },
                    {
                        filter: 'Bork',
                        checked: false,
                        active: 5,
                        total: 5,
                    },
                ],
                stock: {
                    min: 10,
                    max: 3000,
                },
                price: {
                    min: 10,
                    max: 3000,
                },
            },
            sort: 'sort',
            view: 'row',
            search: 'dummy',
        };
        const products: ProductResponse[] = data.products;
        // const products: ProductResponse[] = [];
        const productsWithPrice: Product[] = products.map((el) => {
            const currentPrice = Math.ceil(el.price * (100 - el.discountPercentage)) / 100;
            return Object.assign(el, { currentPrice: currentPrice });
        });
        const filtered: Product[] = SearchService.getSearchResults(productsWithPrice, mainFilters.search);
        const byCategory = FilterService.getFilteredProducts(productsWithPrice, mainFilters.filters);
        const catalog = this.view.render(productsWithPrice, mainFilters);

        this.view.topPanel.viewBlockElement.viewBlock.addEventListener('click', (e) => {
            const target: EventTarget | null = e.target;
            if (target instanceof HTMLDivElement) {
                if (target.className.includes('row')) {
                    mainFilters.view = 'row';
                } else if (target.className.includes('table')) {
                    mainFilters.view = 'table';
                }
                this.view.products.setView(mainFilters.view);
                this.view.topPanel.viewBlockElement.setView(mainFilters.view);
            }
        });
        this.view.filters.resetBlock.copyButton.addEventListener(
            'click',
            this.view.filters.resetBlock.applyCopiedState.bind(this.view.filters.resetBlock)
        );
        console.log(catalog);
        this.main.append(catalog);
    }
}
