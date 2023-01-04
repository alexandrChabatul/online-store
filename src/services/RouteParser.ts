import { params, Route } from 'common/types';

class RouteParser {
    constructor() {
        //empty
    }

    /**
     * Returns parameters object(maybe empty) or false if path is not exist to template.
     * @param {string} path - path to check
     * @param {Route} template - object of Route type (contains path RegExp and available params)
     * @return {params | false}
     * **/

    match(path: string, template: Route): params | false {
        const pathParts = path.split('?');
        const linkPath = pathParts[0];
        const regex = new RegExp(template.path);
        if (!regex.test(linkPath)) {
            return false;
        }
        if (!template.params) {
            return {};
        }
        const groups = linkPath.match(regex)?.groups;
        if (pathParts.length === 1) {
            return groups || {};
        }
        const params = Object.assign(this.getParams(pathParts[1]), groups);
        return this.filterParams(params, template.params);
    }

    private getParams(str: string): params {
        const pairs = str.split('&');
        const entrySet = pairs.map((el) => el.split('='));
        console.log('params', Object.fromEntries(entrySet));
        return Object.fromEntries(entrySet);
    }

    private filterParams(params: params, paramsScheme: params): params {
        return Object.keys(params).reduce((acc: params, el: string): params => {
            if (paramsScheme[el]) {
                acc[el] = decodeURIComponent(params[el]);
            }
            return acc;
        }, {});
    }
}

export default RouteParser;
