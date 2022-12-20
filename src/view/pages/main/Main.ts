import { Header } from '../common/header/header';

class Main {
    header: Header;

    constructor() {
        this.header = new Header('10', '1000');
    }

    render(params?: { [key: string]: string }) {
        console.log('render main');
        console.log(params);
        const app = <HTMLDivElement>document.getElementById('root');
        // app.textContent = `This id main page!${params}`;
        app.append(this.header.createHeader());
    }
}

export default Main;
