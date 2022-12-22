import { Product } from '../../../../common/types';
import { NewElement } from '../../../../utils/element-generator';
import './breadcrumbs.scss';

class Breadcrumbs {
    getBreadcrumbs(product: Product) {
        const ul = NewElement.createBaseElement('ul', 'breadcrumbs');
        const mainItem = NewElement.createBaseElement('li', 'breadcrumbs__item');
        mainItem.append(NewElement.createAnchor('router-link', 'Main', '/'));
        const categoryItem = NewElement.createBaseElement('li', 'breadcrumbs__item');
        categoryItem.append(
            NewElement.createAnchor(
                'router-link',
                `${product.category[0].toUpperCase() + product.category.slice(1)}`,
                `/?category=${product.category}`
            )
        );
        const brandItem = NewElement.createBaseElement('li', 'breadcrumbs__item');
        brandItem.append(
            NewElement.createAnchor(
                'router-link',
                `${product.brand[0].toUpperCase() + product.brand.slice(1)}`,
                `/?category=${product.category}&brand=${product.brand}`
            )
        );
        const productItem = NewElement.createBaseElement('li', 'breadcrumbs__item');
        productItem.textContent = product.title[0].toUpperCase() + product.title.slice(1);
        ul.append(mainItem, categoryItem, brandItem, productItem);
        return ul;
    }
}

export default Breadcrumbs;
