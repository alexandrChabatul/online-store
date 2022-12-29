import { IPaginationResponse } from 'common/types';

export default class PaginationService {
    static getPage<T>(items: T[], page: number, limit: number): IPaginationResponse<T> {
        const numOfPages = Math.ceil(items.length / limit);
        let currentPage = page > numOfPages ? numOfPages : page;
        currentPage = currentPage < 1 ? 1 : currentPage;
        const start = (currentPage - 1) * limit;
        const end = currentPage * limit;
        const itemsOnPage = items.slice(start, end);
        return {
            items: itemsOnPage,
            page: currentPage,
            numOfPages: numOfPages,
            itemsPerPage: limit,
        };
    }
}
