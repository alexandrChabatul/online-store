import Router from '../../services/Router';

class Main {
    router: Router;
    constructor(router: Router) {
        this.router = router;
        // do nothing.
    }

    render(params?: { [key: string]: string }) {
        console.log('render main');
        console.log(params);
        const app = <HTMLDivElement>document.getElementById('app');
        app.textContent = `This id main page!${params}`;
        app.append(this.getItem('123sdfdsf'));
        app.append(this.getItem('123'));
        app.append(this.getItem('456'));
        app.append(this.getItem('888'));
        app.append(this.getItem1('new link'));
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

    getItem1(id: string) {
        const item = document.createElement('button');
        item.textContent = id;
        item.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.pushState({}, '', `${window.location.href}product/${id}`);
        });
        return item;
    }
}

export default Main;
