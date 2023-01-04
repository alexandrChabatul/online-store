import { IController, params } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import { Footer } from 'view/common-components/footer/footer';
import { Header } from 'view/common-components/header/header';
import CatalogView from 'view/pages/catalog/CatalogView';
import { CatalogService } from 'services/CatalogService';
import UrlService from 'services/UrlService';
import CartService from 'services/CartService';

export default class CatalogController implements IController {
    header: Header;
    main: HTMLElement;
    footer: Footer;
    view: CatalogView;
    catalogService: CatalogService;
    urlService: UrlService;
    cartService: CartService;

    constructor() {
        this.header = new Header(String(4), String(1000));
        this.main = ElementsFactory.createBaseElement('main', 'main');
        this.footer = new Footer();
        this.view = new CatalogView();
        this.catalogService = new CatalogService();
        this.urlService = new UrlService();
        this.cartService = new CartService();
    }

    async render(params: params): Promise<void> {
        const app = <HTMLDivElement>document.getElementById('app');
        app.innerHTML = '';
        this.main.innerHTML = '';
        const header = this.header.createHeader();
        const footer = this.footer.createFooter();
        app.append(header, this.main, footer);

        await this.catalogService.model.setProducts();
        const products = this.catalogService.getFilteredProducts(params);
        const catalogSettings = this.catalogService.getCatalogSettings(params);

        const catalog = this.view.render(products, catalogSettings);
        this.main.append(catalog);

        this.view.filters.filters.oninput = this.filterInputHandler.bind(this);
        this.view.filters.filters.onclick = this.filterClickHandler.bind(this);
        this.view.catalogHeader.catalogHeader.onclick = this.viewChangeHandler.bind(this);
        this.view.catalogHeader.catalogHeader.oninput = this.searchInputHandler.bind(this);
        this.view.catalogHeader.catalogHeader.onchange = this.sortTypeChangeHandler.bind(this);
        this.view.products.products.onclick = this.addToCartClickHandler.bind(this);
    }

    private addToCartClickHandler(e: Event) {
        const target: EventTarget | null = e.target;
        if (!(target instanceof HTMLButtonElement)) return;

        const parent = target.closest('.product-item');
        const productId = parent?.id?.split('-')[1];
        if (!productId) return;

        if (!this.cartService.getCartItems().find((el) => el.index === Number(productId))) {
            this.cartService.addItemToCart(productId);
        } else {
            this.cartService.deleteItemFromCart(productId);
        }
    }

    private sortTypeChangeHandler(e: Event) {
        const target: EventTarget | null = e.target;
        if (!(target instanceof HTMLSelectElement) || !target.value) return;

        let url = new URL(window.location.href);
        url = this.urlService.replaceQueryParam('sort', target.value);
        this.urlService.addUrlInHistory(url);

        const params: params | false = this.urlService.getQueryParams();
        if (params) {
            const products = this.catalogService.getFilteredProducts(params);
            const catalogSettings = this.catalogService.getCatalogSettings(params);
            this.view.renderProducts(products, catalogSettings);
        }
    }

    private searchInputHandler(e: Event) {
        const target: EventTarget | null = e.target;
        if (!(target instanceof HTMLInputElement)) return;

        let url = new URL(window.location.href);
        if (target.value) {
            url = this.urlService.replaceQueryParam('search', target.value);
            this.urlService.addUrlInHistory(url);
        } else {
            url = this.urlService.deleteQueryParam('search');
            this.urlService.addUrlInHistory(url);
        }

        const params: params | false = this.urlService.getQueryParams();
        if (params) {
            const products = this.catalogService.getFilteredProducts(params);
            const catalogSettings = this.catalogService.getCatalogSettings(params);
            this.view.renderFilters(catalogSettings);
            this.view.catalogHeader.search.updateSearchResults(products.length);
            this.view.renderProducts(products, catalogSettings);
        }
    }

    private viewChangeHandler(e: Event) {
        const target: EventTarget | null = e.target;
        if (!(target instanceof HTMLDivElement)) return;

        let url = new URL(window.location.href);
        if (target.className.includes('row')) {
            url = this.urlService.replaceQueryParam('view', 'row');
        } else if (target.className.includes('table')) {
            url = this.urlService.replaceQueryParam('view', 'table');
        }
        this.urlService.addUrlInHistory(url);

        const params: params | false = this.urlService.getQueryParams();
        if (params) {
            const catalogSettings = this.catalogService.getCatalogSettings(params);
            this.view.products.setView(catalogSettings.view);
            this.view.catalogHeader.viewBlockElement.setView(catalogSettings.view);
        }
    }

    private filterClickHandler(e: Event) {
        const target: EventTarget | null = e.target;
        if (!(target instanceof HTMLButtonElement)) return;

        if (target.id === 'reset') {
            this.resetButtonClickHandler();
        }
        if (target.id === 'copy') {
            this.copyLinkButtonClickHandler();
        }
    }

    private resetButtonClickHandler() {
        const url = this.urlService.deleteAllQueryParams();
        this.urlService.addUrlInHistory(url);

        const params: params | false = this.urlService.getQueryParams();
        if (params) {
            const products = this.catalogService.getFilteredProducts(params);
            const catalogSettings = this.catalogService.getCatalogSettings(params);
            this.view.renderFilters(catalogSettings);
            this.view.renderCatalogHeader(products, catalogSettings);
            this.view.renderProducts(products, catalogSettings);
        }
    }

    private copyLinkButtonClickHandler() {
        navigator.clipboard.writeText(window.location.href);
        this.view.filters.resetBlock.applyCopiedState();
    }

    private filterInputHandler(e: Event) {
        const target: EventTarget | null = e.target;
        if (!(target instanceof HTMLInputElement)) return;

        if (target.type === 'checkbox') {
            this.checkboxInputHandler(target);
        }
        if (target.type === 'range') {
            this.rangeInputHandler(target);
        }
    }

    private checkboxInputHandler(target: HTMLInputElement) {
        const filterType = target.closest('ul')?.id;
        const filterValue = target.value;
        if (!filterType) return;

        const url = this.urlService.setMultipleValueParam(filterType, filterValue);
        this.urlService.addUrlInHistory(url);

        const params: params | false = this.urlService.getQueryParams();
        if (params) {
            const products = this.catalogService.getFilteredProducts(params);
            const catalogSettings = this.catalogService.getCatalogSettings(params);
            this.view.renderTargetedFilters(catalogSettings, filterType);
            this.view.renderCatalogHeader(products, catalogSettings);
            this.view.renderProducts(products, catalogSettings);
        }
    }

    private rangeInputHandler(target: HTMLInputElement) {
        const filterType = target.closest('div')?.id;

        if (filterType === 'price' || filterType === 'stock') {
            const block: 'priceBlock' | 'stockBlock' = `${filterType}Block`;
            const min = this.view.filters[block].MinRange.value;
            const max = this.view.filters[block].MaxRange.value;
            const url = this.urlService.setDoubledValueParam(filterType, min, max);

            this.urlService.addUrlInHistory(url);
            const params: params | false = this.urlService.getQueryParams();

            if (params) {
                const products = this.catalogService.getFilteredProducts(params);
                const catalogSettings = this.catalogService.getCatalogSettings(params);
                this.view.renderTargetedFilters(catalogSettings, filterType);
                this.view.renderCatalogHeader(products, catalogSettings);
                this.view.renderProducts(products, catalogSettings);
            }
        }
    }
}
