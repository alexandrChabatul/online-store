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
        },
        cart: {
            path: '^/cart$',
        },
    },
};

export default appConstants;
