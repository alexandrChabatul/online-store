export default class StorageService<T> {
    setItem(key: string, item: T) {
        localStorage.setItem(key, JSON.stringify(item));
    }

    getItem(key: string): T | null {
        const item = localStorage.getItem(key);
        if (!item) {
            return null;
        }
        try {
            return JSON.parse(item);
        } catch {
            console.error('Wrong format of data');
            return null;
        }
    }
}
