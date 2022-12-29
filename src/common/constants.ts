const appConstants = {
    routes: {
        catalog: {
            name: 'catalog',
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
            name: 'product',
            path: '^/product/(?<id>\\w+)$',
            params: {
                id: 'id',
            },
        },
        cart: {
            name: 'cart',
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
    formPatterns: {
        name: '^[A-ZА-Я][a-zа-я]{2,}$',
        phone: '^\\+\\d{9,}$',
        address: '^[A-Za-zА-Яа-я0-9]{5,}$',
        email: '^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(.\\w{2,3})+$',
        card: '^\\d{16}$',
        date: '^\\d{4}$',
        cvv: '^\\d{3}$',
    },
    cardProviders: {
        4: 'Visa',
        5: 'MasterCard',
        3: 'American Express',
        2: 'МИР',
    },
    localStorage: {
        cart: 'alexDianaStoreCart',

        codes: 'alexDianaStoreCodes',
    },
    cartParams: {
        itemPerPage: 3,
    },
};

export default appConstants;
