import { NewElement } from '../../../../utils/element-generator';
import './image-slider.scss';

class ImageSlider {
    getImageSlider(thumbnail: string, images: string[], name: string) {
        const productImages = NewElement.createDivElement('product-images');

        const thumbnailContainer = NewElement.createDivElement('product-images__thumbnail');
        const thumbnailImg = NewElement.createImgElement('', thumbnail, name);
        thumbnailContainer.append(thumbnailImg);

        const slider = this.createSlider(thumbnailImg, images, name);
        productImages.append(thumbnailContainer);
        productImages.append(slider);
        return productImages;
    }

    private createSlider(thumbnailImg: HTMLImageElement, images: string[], name: string) {
        const slider = NewElement.createDivElement('product-images__slider');
        images.forEach((el) => {
            const className =
                el === thumbnailImg.src
                    ? 'product-images__slide product-images__slide_active'
                    : 'product-images__slide';
            const container = NewElement.createDivElement(className);
            container.append(NewElement.createImgElement('', el, name));

            container.addEventListener('click', this.sliderClickHandler.bind(this, thumbnailImg, slider));

            slider.append(container);
        });
        return slider;
    }

    private sliderClickHandler(thumbnailImg: HTMLImageElement, slider: HTMLDivElement, event: Event) {
        thumbnailImg.src = (event.target as HTMLImageElement).src;
        this.removeActiveParam(slider);
        (event.currentTarget as HTMLDivElement).classList.add('product-images__slide_active');
    }

    private removeActiveParam(slider: HTMLDivElement) {
        for (const elem of slider.children) {
            elem.classList.remove('product-images__slide_active');
        }
    }
}

export default ImageSlider;
