import { dispatchObject, IController } from 'common/types';
import CartController from './CartController';
import CatalogController from './CatalogController';
import ErrorController from './ErrorController';
import ProductController from './ProductController';

export default class Dispatcher {
    private static PATH_MAP: { [key: string]: IController } = {
        catalog: new CatalogController(),
        cart: new CartController(),
        product: new ProductController(),
        error: new ErrorController(),
    };

    dispatch(pathWithParams: dispatchObject) {
        Dispatcher.PATH_MAP[pathWithParams.name]
            ? Dispatcher.PATH_MAP[pathWithParams.name].render(pathWithParams.params)
            : Dispatcher.PATH_MAP.error.render(pathWithParams.params);
    }
}
