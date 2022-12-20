class Product {
    constructor() {
        //do nothing
    }

    render(params?: { [key: string]: string }) {
        console.log('render product');
        const app = <HTMLDivElement>document.getElementById('app');
        app.textContent = `This id product! Product id - ${params?.id}`;
    }
}

export default Product;
