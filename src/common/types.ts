export type params = { [key: string]: string };

interface IRoute {
    path: string;
    params?: params;
}

export type Route = Readonly<IRoute>;

export type renderCallback = (params?: params) => void;

export interface IParamsWithCallback {
    params: params;
    callback: renderCallback;
};

export interface IRouteWithCallback {
    route: Route;
    cb: renderCallback;
};


