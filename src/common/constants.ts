const appConstants = {
    routes: {
        main: {
            path: '^/$',
            params: {
                category: 'category',
                brand: 'brand',
                price: 'price',
                stock: 'stock',
                sort: 'category',
                search: 'category',
            },
        },
        product: {
            path: '^/product/(?<id>\\w+)$',
            params: {
                id: 'id',
            },
        },
        cart: {
            path: '^/cart$',
            params: {
                page: 'page',
                limit: 'limit',
            },
        },
    },
    currency: '€',
    sortParams: [
        {
            value: 'price ASC',
            text: 'Price (Low-High)',
        },
        {
            value: 'price DESC',
            text: 'Price (High-Low)',
        },
        {
            value: 'rating ASC',
            text: 'Rating (Low-High)',
        },
        {
            value: 'rating DESC',
            text: 'Rating (High-Low)',
        },
        {
            value: 'discount ASC',
            text: 'Discount (Low-High)',
        },
        {
            value: 'discount DESC',
            text: 'Discount (High-Low)',
        },
    ],
};

export default appConstants;
