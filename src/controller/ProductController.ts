import { IController, params } from 'common/types';
import ProductView from 'view/pages/product/ProductView';
import ProductService from 'services/ProductService';
import ProductHandler from './handlers/ProductHandler';
import { CatalogService } from 'services/CatalogService';
import BasePage from 'view/common-components/BasePage';

export default class ProductController implements IController {
    basePage: BasePage;
    view: ProductView;
    productService: ProductService;
    productHandler: ProductHandler;
    catalogService: CatalogService;

    constructor() {
        this.basePage = BasePage.getInstance();
        this.view = new ProductView();
        this.catalogService = new CatalogService();
        this.productService = new ProductService();
        this.productHandler = new ProductHandler();
    }

    async render(params: params): Promise<void> {
        await this.catalogService.model.setProducts();
        const response = await this.productService.getProduct(params.id);
        if ('errorMessage' in response) {
            this.basePage.updateMain(this.view.renderError(response));
        } else {
            const page = this.view.renderProduct(response);
            this.basePage.updateMain(page);
            this.productHandler.initProductHandlers(page);
        }
    }
}
