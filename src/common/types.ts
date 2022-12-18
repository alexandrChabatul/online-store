export type params = { [key: string]: string };

interface IRoute {
    path: string;
    params: params;
}

export type Route = Readonly<IRoute>;

export type renderCallback = (params?: params) => void;

export type paramsWithCallback = {
    params: params;
    callback: renderCallback;
};
