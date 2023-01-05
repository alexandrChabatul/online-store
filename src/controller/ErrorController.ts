import { IController, params } from 'common/types';
import BasePage from 'view/common-components/BasePage';
import ErrorPage from 'view/pages/404/404View';

export default class ErrorController implements IController {
    basePage: BasePage;
    view: ErrorPage;

    constructor() {
        this.basePage = BasePage.getInstance();
        this.view = new ErrorPage();
    }

    render(params: params): void {
        this.basePage.updateMain(this.view.render());
    }
}
