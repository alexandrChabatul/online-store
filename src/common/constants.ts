const appConstants = {
    routes: {
        main:
            '/(?)(category=*category)(&)(brand=*brand)(&)(price=*price)(&)(stock=*stock)(&)(sort=*sort)(&)(search=*search)',
        product: '/product/:id',
        cart: '/cart',
    },
};

export default appConstants;
