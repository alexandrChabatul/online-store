import appConstants from 'common/constants';
import { params } from 'common/types';

export default class UrlService {
    setMultipleValueParam(name: string, value: string): URL {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        if (!params.has(name)) {
            params.set(name, value);
            return url;
        }
        const currentValue = params.get(name);
        if (currentValue?.includes(value)) {
            return this.deleteQueryParamValue(name, value);
        }

        params.set(name, currentValue + appConstants.paramsDelimeter + value);
        return url;
    }

    setDoubledValueParam(name: string, min: string, max: string): URL {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        params.set(name, min + appConstants.paramsDelimeter + max);
        return url;
    }

    replaceQueryParam(name: string, value: string): URL {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        params.set(name, value);
        return url;
    }

    deleteQueryParamValue(name: string, value: string): URL {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        const currentValue = params.get(name);
        if (!currentValue) return url;
        const newValues = currentValue.split(appConstants.paramsDelimeter).filter((el) => el !== value);
        if (newValues.length === 0) return this.deleteQueryParam(name);
        params.set(name, newValues.join(appConstants.paramsDelimeter));
        return url;
    }

    deleteQueryParam(name: string): URL {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        params.delete(name);
        return url;
    }

    deleteAllQueryParams(): URL {
        const url = new URL(window.location.origin);
        return url;
    }

    getQueryParams(): params {
        const url = new URL(window.location.href);
        const params: params = {};
        for (const [name, value] of url.searchParams) {
            params[name] = decodeURIComponent(value);
        }
        return params;
    }

    addUrlInHistory(url: URL): void {
        const path = url.pathname + url.search;
        window.history.pushState({ path }, path, path);
    }
}
