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
};

export default appConstants;
