import Router from '../../services/Router';

class ErrorPage {
    router: Router;
    constructor(router: Router) {
        this.router = router;
    }

    render() {
        console.log('render error');
        const app = <HTMLDivElement>document.getElementById('app');
        app.textContent = 'Page not found. 404!';
    }
}

export default ErrorPage;
