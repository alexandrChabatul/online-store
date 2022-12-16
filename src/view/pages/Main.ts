import RouterService from '../../services/RouterService';

class Main {
    router: RouterService;
    constructor(router: RouterService) {
        this.router = router;
        // do nothing.
    }

    render() {
        console.log('render main');
        const app = <HTMLDivElement>document.getElementById('app');
        app.textContent = 'This id main page!';
        app.append(this.getItem('123sdfdsf'));
        app.append(this.getItem('123'));
        app.append(this.getItem('456'));
        app.append(this.getItem('888'));
    }

    getItem(id: string) {
        const item = document.createElement('button');
        item.textContent = id;
        item.addEventListener('click', (e) => {
            e.preventDefault();
            this.router.goTo(`/product/${id}`);
        });
        return item;
    }
}

export default Main;
