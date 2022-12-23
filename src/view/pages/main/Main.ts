import { Footer } from '../../common-components/footer/footer';
import { Header } from '../../common-components/header/header';

class Main {
    header: Header;
    footer: Footer;

    constructor() {
        this.header = new Header('10', '1000');
        this.footer = new Footer();
    }

    render(params?: { [key: string]: string }) {
        console.log('render main');
        console.log(params);
        const app = <HTMLDivElement>document.getElementById('root');
        // app.textContent = `This id main page!${params}`;
        app.append(this.header.createHeader());
        app.append(this.footer.createFooter());
    }
}

export default Main;
