class Main {
    constructor() {
        // do nothing.
    }

    render(params?: { [key: string]: string }) {
        console.log('render main');
        console.log(params);
        const app = <HTMLDivElement>document.getElementById('app');
        app.textContent = `This id main page!${params}`;
    }
}

export default Main;
