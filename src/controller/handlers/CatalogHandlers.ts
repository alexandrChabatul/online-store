import { params } from 'common/types';
import CatalogView from 'view/pages/catalog/CatalogView';
import { CatalogService } from 'services/CatalogService';
import UrlService from 'services/UrlService';
import CartService from 'services/CartService';
import BasePage from 'view/common-components/BasePage';

export default class CatalogHandler {
    basePage: BasePage;
    view: CatalogView;
    catalogService: CatalogService;
    urlService: UrlService;
    cartService: CartService;

    constructor(view: CatalogView, catalogService: CatalogService) {
        this.basePage = BasePage.getInstance();
        this.view = view;
        this.catalogService = catalogService;
        this.urlService = new UrlService();
        this.cartService = new CartService();
    }

    initEvents() {
        this.view.filters.filters.oninput = this.filterInputHandler.bind(this);
        this.view.filters.filters.onclick = this.filterClickHandler.bind(this);
        this.view.catalogHeader.catalogHeader.onclick = this.catalogHeaderClickHandler.bind(this);
        this.view.catalogHeader.catalogHeader.oninput = this.searchInputHandler.bind(this);
        this.view.catalogHeader.catalogHeader.onchange = this.sortTypeChangeHandler.bind(this);
        this.view.products.products.onclick = this.addToCartClickHandler.bind(this);
    }

    catalogHeaderClickHandler(e: Event): void {
        const target: EventTarget | null = e.target;
        if (!(target instanceof HTMLDivElement)) return;

        if (target.classList.contains('filter-icon')) {
            this.filtersButtonHandler();
        }
        if (target.classList.contains('view-block-icon')) {
            this.viewChangeHandler(target);
        }
    }

    filtersButtonHandler(): void {
        this.view.openFilters();
    }

    closeButtonHandler(): void {
        this.view.closeFilters();
    }

    addToCartClickHandler(e: Event): void {
        const target: EventTarget | null = e.target;
        if (!(target instanceof HTMLButtonElement)) return;

        const parent = target.closest('.product-item');
        const productId = parent?.id?.split('-')[1];
        if (!productId) return;

        if (!this.cartService.getCartItems().find((el) => el.product.id === Number(productId))) {
            this.cartService.addItemToCart(productId);
            target.textContent = 'Remove';
        } else {
            this.cartService.deleteItemFromCart(productId);
            target.textContent = 'Add to Cart';
        }
        target.classList.toggle('in-cart');
        const cartInfo = this.cartService.getCartInfo();
        this.basePage.updateHeader(String(cartInfo.summary.productQty), String(cartInfo.summary.prevPrice));
    }

    sortTypeChangeHandler(e: Event): void {
        const target: EventTarget | null = e.target;
        if (!(target instanceof HTMLSelectElement) || !target.value) return;

        const url = this.urlService.replaceQueryParam('sort', target.value);
        this.urlService.addUrlInHistory(url);

        const params: params | false = this.urlService.getQueryParams();
        if (params) {
            const products = this.catalogService.getFilteredProducts(params);
            const catalogSettings = this.catalogService.getCatalogSettings();
            this.view.renderProducts(products, catalogSettings);
        }
    }

    searchInputHandler(e: Event): void {
        const target: EventTarget | null = e.target;
        if (!(target instanceof HTMLInputElement)) return;

        let url = new URL(window.location.href);
        if (target.value) {
            url = this.urlService.replaceQueryParam('search', target.value);
        } else {
            url = this.urlService.deleteQueryParam('search');
        }

        this.updateContent(url, '');
    }

    viewChangeHandler(target: HTMLDivElement): void {
        let url = new URL(window.location.href);
        if (target.className.includes('row')) {
            url = this.urlService.replaceQueryParam('view', 'row');
        } else if (target.className.includes('table')) {
            url = this.urlService.replaceQueryParam('view', 'table');
        }
        this.urlService.addUrlInHistory(url);

        const params: params | false = this.urlService.getQueryParams();
        if (params) {
            this.catalogService.setCatalogSettings(params);
            const catalogSettings = this.catalogService.getCatalogSettings();
            this.view.products.setView(catalogSettings.view);
            this.view.catalogHeader.viewBlockElement.setView(catalogSettings.view);
        }
    }

    filterClickHandler(e: Event): void {
        const target: EventTarget | null = e.target;
        if (target instanceof HTMLButtonElement) {
            if (target.id === 'reset') {
                this.resetButtonClickHandler();
            }
            if (target.id === 'copy') {
                this.copyLinkButtonClickHandler();
            }
        }
        if (target instanceof HTMLDivElement) {
            if (target.classList.contains('close-button')) {
                this.closeButtonHandler();
            }
        }
    }

    resetButtonClickHandler(): void {
        const url = this.urlService.deleteAllQueryParams();
        this.updateContent(url, '');
    }

    copyLinkButtonClickHandler(): void {
        navigator.clipboard.writeText(window.location.href);
        this.view.filters.resetBlock.applyCopiedState();
    }

    filterInputHandler(e: Event): void {
        const target: EventTarget | null = e.target;
        if (!(target instanceof HTMLInputElement)) return;

        if (target.type === 'checkbox') {
            this.checkboxInputHandler(target);
        }
        if (target.type === 'range') {
            this.rangeInputHandler(target);
        }
    }

    checkboxInputHandler(target: HTMLInputElement): void {
        const filterType = target.closest('ul')?.id;
        const filterValue = target.value;
        if (!filterType) return;
        const url = this.urlService.setMultipleValueParam(filterType, filterValue);

        this.updateContent(url, filterType);
    }

    rangeInputHandler(target: HTMLInputElement): void {
        const filterType = target.closest('div')?.id;

        if (filterType === 'price' || filterType === 'stock') {
            const block: 'priceBlock' | 'stockBlock' = `${filterType}Block`;
            const min = this.view.filters[block].MinRange.value;
            const max = this.view.filters[block].MaxRange.value;
            const url = this.urlService.setDoubledValueParam(filterType, min, max);

            this.updateContent(url, filterType);
        }
    }

    updateContent(url: URL, targetFilter: string): void {
        this.urlService.addUrlInHistory(url);
        const params: params | false = this.urlService.getQueryParams();
        if (params) {
            const products = this.catalogService.getFilteredProducts(params);
            const catalogSettings = this.catalogService.getCatalogSettings();
            this.view.renderTargetedFilters(catalogSettings, targetFilter);
            if (products.length === 0) {
                this.view.filters.stockBlock.setNotFoundValue();
                this.view.filters.priceBlock.setNotFoundValue();
            }
            this.view.catalogHeader.search.updateSearchResults(products.length);
            this.view.renderProducts(products, catalogSettings);
        }
    }
}
