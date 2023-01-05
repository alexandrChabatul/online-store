import { IController, params } from 'common/types';
import CatalogView from 'view/pages/catalog/CatalogView';
import { CatalogService } from 'services/CatalogService';
import CatalogHandler from './handlers/CatalogHandlers';
import BasePage from 'view/common-components/BasePage';

export default class CatalogController implements IController {
    basePage: BasePage;
    view: CatalogView;
    catalogService: CatalogService;
    catalogHandlers: CatalogHandler;

    constructor() {
        this.basePage = BasePage.getInstance();
        this.view = new CatalogView();
        this.catalogService = new CatalogService();
        this.catalogHandlers = new CatalogHandler(this.view, this.catalogService);
    }

    async render(params: params): Promise<void> {
        await this.catalogService.model.setProducts();
        const products = this.catalogService.getFilteredProducts(params);
        const catalogSettings = this.catalogService.getCatalogSettings(params);
        const catalog = this.view.render(products, catalogSettings);
        this.basePage.updateMain(catalog);
        this.initCatalogEvents();
    }

    initCatalogEvents() {
        this.catalogHandlers.initEvents();
    }
}
