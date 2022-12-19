import { params, Route } from '../common/types';

class PouterParser {
    constructor() {
        //empty
    }

    /**
     * Returns parametrs object(maybe empty) or false if path is not exist to template.
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
        const groups = linkPath.match(regex)?.groups;
        if (pathParts.length === 1) {
            return groups || {};
        }
        const params = this.getParams(pathParts[1]);
        if (template.params) {
            if (!this.checkParams(params, template.params)) {
                return false;
            }
        }
        return Object.assign(params, groups);
    }

    private getParams(str: string): params {
        const pairs = str.split('&');
        const entrySet = pairs.map((el) => el.split('='));
        return Object.fromEntries(entrySet);
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
