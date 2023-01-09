import { ViewService } from 'services/ViewService';

describe('getSearchTerm and setSearchTerm methods', () => {
    const viewService = new ViewService();

    it('should be defined', () => {
        expect(viewService.getViewType).toBeDefined();
        expect(viewService.setViewType).toBeDefined();
    });

    it('should return initial value', () => {
        expect(viewService.getViewType()).toBe('table');
    });

    it('should return row value if set', () => {
        viewService.setViewType('Row');
        expect(viewService.getViewType()).toBe('row');
    });

    it('should return default value if set other than row', () => {
        viewService.setViewType('new value');
        expect(viewService.getViewType()).toBe('table');
    });
});
