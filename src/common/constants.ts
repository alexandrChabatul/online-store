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
                sort: 'sort',
                search: 'search',
                view: 'view',
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
            value: 'discountPercentage ASC',
            text: 'Discount (Low-High)',
        },
        {
            value: 'discountPercentage DESC',
            text: 'Discount (High-Low)',
        },
    ],
    personalInputs: [
        {
            name: 'name',
            placeholder: 'Name Surname',
            type: 'text',
            pattern: '^[A-ZА-Я][a-zа-я]{2,}(\\s[A-ZА-Я][a-zа-я]{2,})+',
            errorMessage: 'Invalid name',
        },
        {
            name: 'phone',
            placeholder: 'Phone number',
            type: 'text',
            pattern: '^\\+\\d{9,}$',
            errorMessage: 'Invalid phone number',
        },
        {
            name: 'address',
            placeholder: 'Address',
            type: 'tel',
            pattern: '^[A-Za-zА-Яа-я0-9]{5,}(\\s[A-Za-zА-Яа-я0-9]{5,}){2,}',
            errorMessage: 'Invalid address',
        },
        {
            name: 'email',
            placeholder: 'Email',
            type: 'tel',
            pattern: '^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(.\\w{2,3})+$',
            errorMessage: 'Invalid email',
        },
    ],
    cardInputs: [
        {
            name: 'card-number',
            placeholder: 'Card Number',
            type: 'text',
            pattern: '^\\d{4}(\\s\\d{4}){3}$',
            maxLength: 19,
            errorMessage: 'Invalid Card Number',
        },
        {
            name: 'card-validness',
            placeholder: 'MM/YY',
            type: 'text',
            pattern: '^\\d{2}\\s/\\s\\d{2}$',
            maxLength: 7,
            errorMessage: 'Invalid date',
        },
        {
            name: 'card-cvv',
            placeholder: 'CVV',
            type: 'text',
            pattern: '^\\d{3}$',
            maxLength: 3,
            errorMessage: 'Invalid CVV',
        },
    ],
    cardProviders: {
        4: 'visa',
        5: 'mastercard',
        3: 'amex',
        2: 'МИР',
    },
    localStorage: {
        cart: 'alexDianaStoreCart',
        codes: 'alexDianaStoreCodes',
    },
    cartParams: {
        itemPerPage: 3,
    },
    paramsDelimeter: ',',
    promoCodes: [
        {
            code: 'RS',
            name: 'RS School',
            value: 10,
        },
        {
            code: 'EPM',
            name: 'EPAM Systems',
            value: 10,
        },
    ],
};

export default appConstants;
