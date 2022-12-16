import RouterService from '../../services/RouterService';

class ErrorPage {
    router: RouterService;
    constructor(router: RouterService) {
        this.router = router;
    }

    render() {
        console.log('render error');
        const app = <HTMLDivElement>document.getElementById('app');
        app.textContent = 'Page not found. 404!';
    }
}

export default ErrorPage;
