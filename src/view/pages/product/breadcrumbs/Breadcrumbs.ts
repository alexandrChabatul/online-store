import { Product } from 'common/types';
import { ElementsFactory } from 'utils/element-generator';
import './breadcrumbs.scss';

class Breadcrumbs {
    getBreadcrumbs(product: Product) {
        const ul = ElementsFactory.createBaseElement('ul', 'breadcrumbs');
        const mainItem = ElementsFactory.createBaseElement('li', 'breadcrumbs__item');
        mainItem.append(ElementsFactory.createAnchor('router-link', 'Main', '/'));
        const categoryItem = ElementsFactory.createBaseElement('li', 'breadcrumbs__item');
        categoryItem.append(
            ElementsFactory.createAnchor(
                'router-link',
                `${product.category[0].toUpperCase() + product.category.slice(1)}`,
                `/?category=${encodeURIComponent(product.category.toLowerCase())}`
            )
        );
        const brandItem = ElementsFactory.createBaseElement('li', 'breadcrumbs__item');
        brandItem.append(
            ElementsFactory.createAnchor(
                'router-link',
                `${product.brand[0].toUpperCase() + product.brand.slice(1)}`,
                `/?category=${encodeURIComponent(product.category.toLowerCase())}&brand=${encodeURIComponent(
                    product.brand.toLowerCase()
                )}`
            )
        );
        const productItem = ElementsFactory.createBaseElement('li', 'breadcrumbs__item');
        productItem.textContent = product.title[0].toUpperCase() + product.title.slice(1);
        ul.append(mainItem, categoryItem, brandItem, productItem);
        return ul;
    }
}

export default Breadcrumbs;
