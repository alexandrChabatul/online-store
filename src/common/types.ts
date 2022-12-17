export type params = { [key: string]: string };

interface IRoute {
    path: string;
    params: params;
}

export type Route = Readonly<IRoute>;
