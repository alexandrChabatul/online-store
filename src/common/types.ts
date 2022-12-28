export type params = { [key: string]: string };

interface IRoute {
    name: string;
    path: string;
    params?: params;
}

export type Route = Readonly<IRoute>;

export interface IController {
    render(params: params): void;
}

export type dispatchObject = { name: string; params: params };

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
    category: IFilter;
    brand: IFilter;
    price: IRange;
    stock: IRange;
}

export interface IMainParameters {
    filters: IFilters;
    sort: string;
    view: string;
    search: string;
}

interface IFilter {
    [key: string]: {
        checked: boolean;
        active: number;
        total: number;
    };
}

interface IRange {
    min: number;
    max: number;
}

export type CartProduct = Product & { quantity: number; subtotal: number };

export type CartSummary = { productQty: number; prevPrice: number; totalPrice: number };

export type PromoCode = { name: string; value: number };

export type CartParams = { itemsPerPage: number; page: number; numOfPages: number };
