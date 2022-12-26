import { IMainParameters, Product } from '../../../../common/types';
import { NewElement } from '../../../../utils/element-generator';
import { Search } from './search/search';
import { Sort } from './sorting/sorting';
import './top-panel.scss';
import { ViewBlock } from './view-block/vew-block';

export class TopPanel {
    sortMethod: Sort;
    search: Search;
    viewBlockElement: ViewBlock;

    constructor() {
        this.sortMethod = new Sort();
        this.search = new Search();
        this.viewBlockElement = new ViewBlock();
    }

    createTopPanel(data: Product[], filters: IMainParameters): HTMLElement {
        const topPanel = NewElement.createDivElement('top-panel');
        const sortMethod = this.sortMethod.createSortBlock(filters.sort);
        const searchResults = this.search.createSearchResultsBlock(data);
        const searchField = this.search.createSearch(filters.search);
        const viewBlock = this.viewBlockElement.createViewBlock(filters.view);
        topPanel.append(sortMethod, searchResults, searchField, viewBlock);

        return topPanel;
    }
}
