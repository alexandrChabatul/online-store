import Router from '../services/Router';

class App {
    router: Router;

    constructor() {
        this.router = new Router();
    }

    start() {
        this.router.initRouter();
    }
}

export default App;
