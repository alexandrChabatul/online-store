export type params = { [key: string]: string };
export type routes = { [key: string]: IPage };
export type customParams = {
    page: string;
    params: params;
    productId: params;
};

interface IRoute {
    path: string;
    params: params;
}

export interface IPage {
    address: Route;
    cb: (data: customParams) => void;
}

export type Route = Readonly<IRoute>;
