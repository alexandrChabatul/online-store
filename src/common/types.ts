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

export type ProductIsInCart = Product & { isInCart: boolean };

export interface IFilters {
    category: IFilter[];
    brand: IFilter[];
    currentPrice: IRange;
    stock: IRange;
}

export type tempType = { [key: string]: IFilter };

export interface IMainParameters {
    filters: IFilters;
    sort: string;
    view: string;
    search: string;
}

export interface IFilter {
    filter: string;
    checked: boolean;
    active: number;
    total: number;
}

export interface IRange {
    min: number;
    minValue: number;
    max: number;
    maxValue: number;
}

export type CartResponse = { product: Product; quantity: number };

export type CartProduct = CartResponse & { subtotal: number; index: number };

export type CartSummary = { productQty: number; prevPrice: number; totalPrice: number };

export type PromoCode = { name: string; value: number };

export type CartParams = { itemsPerPage: number; page: number; numOfPages: number };

export type CartInfo = {
    products: CartProduct[];
    params: CartParams;
    summary: CartSummary;
    promoCodes: PromoCode[];
};

export interface IPaginationResponse<T> {
    items: T[];
    page: number;
    numOfPages: number;
    itemsPerPage: number;
}

export type APIResponse = { products: ProductResponse[] };

export type BadResponse = { errorMessage: string };
