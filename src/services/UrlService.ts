import appConstants from 'common/constants';

export default class UrlService {
    addQueryParam(name: string, value: string) {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        if (!params.has('name')) {
            params.set(name, value);
            return url;
        }
        const currentValue = params.get('name');
        params.set('name', currentValue + appConstants.paramsDelimeter + value);
        return url;
    }

    replaceQueryParam(name: string, value: string) {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        params.set(name, value);
        return url;
    }

    deleteQueryParamValue(name: string, value: string) {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        const currentValue = params.get('name');
        if (!currentValue) return url;
        const newValues = currentValue.split(appConstants.paramsDelimeter).filter((el) => el !== value);
        if (newValues.length === 0) return this.deleteQueryParam(name);
        params.set(name, newValues.join(appConstants.paramsDelimeter));
        return url;
    }

    deleteQueryParam(name: string) {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        params.delete(name);
        return url;
    }

    addUrlInHistory(url: URL) {
        const path = url.pathname + url.search;
        window.history.pushState({ path }, path, path);
    }
}
