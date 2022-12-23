import { NewElement } from '../../../utils/element-generator';
import './footer.scss';

export class Footer {
    createFooter(): HTMLElement {
        const footer = NewElement.createBaseElement('div', 'footer');
        const courseIcon = NewElement.createAnchor('course-icon', '', 'https://rs.school/js/');
        const copyrightInfo = NewElement.createBaseElementWithText('span', 'copyright-info', '2022©Online Store');
        const githubBlock = NewElement.createBaseElement('div', 'links-block');
        const githubAccount1 = NewElement.createAnchor('github-link', 'sashkill94', 'https://github.com/sashkill94');
        const githubAccount2 = NewElement.createAnchor(
            'github-link',
            'dziana-babrova',
            'https://github.com/dziana-babrova'
        );

        footer.append(courseIcon, copyrightInfo, githubBlock);
        githubBlock.append(githubAccount1, githubAccount2);
        return footer;
    }
}
