export type params = { [key: string]: string };

interface IRoute {
    path: string;
    params?: params;
}

export type Route = Readonly<IRoute>;

export type renderCallback = (params: params) => void;

export interface IParamsWithCallback {
    params: params;
    callback: renderCallback;
}

export interface IRouteWithCallback {
    route: Route;
    cb: renderCallback;
}

interface IProductResponse {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: Array<string>;
}

export type ProductResponse = Readonly<IProductResponse>;

export type Product = ProductResponse & { currentPrice: number };

export interface IFilters {
    category: string[];
    brand: string[];
    price: number[];
    stock: number[];
}

export interface IMainParameters {
    filters: IFilters;
    sort: string;
    view: string;
    search: string;
}