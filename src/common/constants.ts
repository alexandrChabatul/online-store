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
            params: {},
        },
        cart: {
            path: '^/cart$',
            params: {},
        },
    },
};

export default appConstants;
