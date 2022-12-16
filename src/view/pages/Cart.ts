import RouterService from '../../services/RouterService';

class Cart {
    router: RouterService;
    constructor(router: RouterService) {
        this.router = router;
    }

    render() {
        const app = <HTMLDivElement>document.getElementById('app');
        app.textContent = 'This id cart!';
    }
}

export default Cart;
