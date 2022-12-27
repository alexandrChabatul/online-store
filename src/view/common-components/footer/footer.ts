import { ElementsFactory } from '../../../utils/element-generator';
import './footer.scss';

export class Footer {
    createFooter(): HTMLElement {
        const footer = ElementsFactory.createBaseElement('footer', 'footer');
        const footerWrapper = ElementsFactory.createDivElement('wrapper footer-wrapper');
        const courseIcon = ElementsFactory.createAnchor('course-icon', '', 'https://rs.school/js/');
        const copyrightInfo = ElementsFactory.createBaseElementWithText('span', 'copyright-info', '2022©Online Store');
        const githubBlock = ElementsFactory.createBaseElement('div', 'links-block');
        const githubAccount1 = ElementsFactory.createAnchor(
            'github-link',
            'sashkill94',
            'https://github.com/sashkill94'
        );
        const githubAccount2 = ElementsFactory.createAnchor(
            'github-link',
            'dziana-babrova',
            'https://github.com/dziana-babrova'
        );

        footer.append(footerWrapper);
        footerWrapper.append(courseIcon, copyrightInfo, githubBlock);
        githubBlock.append(githubAccount1, githubAccount2);
        return footer;
    }
}
