import RouterService from '../../services/RouterService';

class Product {
    router: RouterService;
    constructor(router: RouterService) {
        this.router = router;
    }

    render(params: { [key: string]: string }) {
        console.log('render product');
        const app = <HTMLDivElement>document.getElementById('app');
        app.textContent = `This id product! Product id - ${params.id}`;
    }
}

export default Product;
