class ErrorPage {
    constructor() {
        //empty
    }

    render() {
        console.log('render error');
        const app = <HTMLDivElement>document.getElementById('app');
        app.textContent = 'Page not found. 404!';
    }
}

export default ErrorPage;
