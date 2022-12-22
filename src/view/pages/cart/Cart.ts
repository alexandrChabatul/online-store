class Cart {
    constructor() {
        //do nothing
    }

    render() {
        const app = <HTMLDivElement>document.getElementById('app');
        app.textContent = 'This is cart!';
    }
}

export default Cart;
