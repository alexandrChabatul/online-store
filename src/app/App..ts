import RouterService from '../services/RouterService';

class App {
    router: RouterService;

    constructor() {
        this.router = new RouterService();
    }

    start() {
        this.router.initRouter();
    }
}

export default App;
