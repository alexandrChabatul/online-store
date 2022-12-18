import { params, customParams } from '../common/types';
import appConstants from '../common/constants';

class PouterParser {
    constructor() {
        //empty
    }

    /**
     * Returns parametrs object(maybe empty) or false if path is not exist to template.
     * @param {string} path - path to check
     * @param {Route} template - object of Route type (contains path RegExp and available params)
     * @param {boolean} checkParams - true if we need check params of path with template
     * @return {params | false}
     * **/

    // match(path: string, template: Route, checkParams = false): params | false {
    //     const pathParts = path.split('?');
    //     console.log(pathParts);
    //     const linkPath = pathParts[0];
    //     console.log('linkpath', linkPath);
    //     const regex = new RegExp(template.path);
    //     console.log(regex);
    //     if (!regex.test(linkPath)) {
    //         return false;
    //     }
    //     const groups = linkPath.match(regex)?.groups;

    //     // const regex1 = new RegExp('\/product\/(?<id>\\w+)');
    //     if (pathParts.length === 1) {
    //         return groups || {};
    //     }
    //     const params = this.getParams(pathParts[1]);
    //     if (checkParams) {
    //         if (!this.checkParams(params, template.params)) {
    //             return false;
    //         }
    //     }
    //     return Object.assign(params, groups);
    // }

    // private getParams(str: string): params {
    //     const pairs = str.split('&');
    //     const entrySet = pairs.map((el) => el.split('='));
    //     return Object.fromEntries(entrySet);
    // }

    getCustomParams(path: string): customParams {
        const page = this.getPath(path);
        const params = this.getQueries(path);
        const productId = this.getProductId(path) || {};

        return {
            page: page,
            params: params,
            productId: productId,
        };
    }

    private getPath(path: string) {
        const pathPart = path.split('?')[0];
        const page = pathPart.split('/')[1];
        return page;
    }

    private getQueries(path: string): params {
        const linkParts = path.split('?');
        const pathPart = linkParts[0];
        const queryPart = linkParts[1];
        const regex = new RegExp(appConstants.routes.main.path);
        if (!regex.test(pathPart)) {
            return {};
        }
        if (queryPart) {
            const pairs = queryPart.split('&');
            const entrySet = pairs.map((el) => el.split('='));
            const params = Object.fromEntries(entrySet);
            if (!this.checkParams(params, appConstants.routes.main.params)) {
                return { valid: 'false' };
            }
            return params;
        }
        return {};
    }

    private getProductId(path: string): params | undefined {
        const pathPart = path.split('?')[0];
        const regex = new RegExp(appConstants.routes.product.path);
        if (!regex.test(pathPart)) {
            return {};
        }
        const groups = pathPart.match(regex)?.groups;

        return groups;
    }

    private checkParams(params: { [key: string]: string }, paramsScheme: { [key: string]: string }) {
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                if (!paramsScheme[key]) {
                    return false;
                }
            }
        }
        return true;
    }
}

export default PouterParser;
