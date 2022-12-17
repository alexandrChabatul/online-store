import Router from '../../services/Router';

class Product {
    router: Router;
    constructor(router: Router) {
        this.router = router;
    }

    render(params: { [key: string]: string }) {
        console.log('render product');
        const app = <HTMLDivElement>document.getElementById('app');
        app.textContent = `This id product! Product id - ${params.id}`;
    }
}

export default Product;
