import { FunctionComponent, ReactNode } from "react";

import { useSpringCarousel, useTransitionCarousel } from "react-spring-carousel-js";
import { CarouselWrapper } from "./CarouselWrapper";

export interface ICarouselSlide {
    id?: string;
    renderItem: ReactNode;
    renderThumb?: ReactNode;
}

interface IBasicCarousel {
    slides: Array<ICarouselSlide>;
    perSlide?: number;
    loop?: boolean;
    showThumbs?: boolean;
    useTransition?: boolean;
}

export const BasicCarousel: FunctionComponent<IBasicCarousel> = ({ slides, perSlide = 1, loop = false, showThumbs = false, useTransition }) => {
    // utils
    interface ICommons {
        getCurrentActiveItem: () => { id: string; index: number };
        slideToItem: (item: string | number) => void;
        slideToPrevItem: VoidFunction;
        slideToNextItem: VoidFunction;
        thumbsFragment: JSX.Element;
        carouselFragment: JSX.Element;
    }
    const commons = ({ getCurrentActiveItem, slideToItem, carouselFragment, slideToNextItem, slideToPrevItem, thumbsFragment }: ICommons) => {
        // > use index for ID if ID not given for a slide
        slides = slides.map((slide, i) => {
            if (!slide.id) slide.id = i.toString();
            if (showThumbs && !slide.renderThumb) slide.renderThumb = <Thumb isActive={getCurrentActiveItem().index === 0.1} onClick={() => slideToItem(i)} />;

            return slide;
        });

        return (
            <CarouselWrapper navigateLeft={slideToPrevItem} navigateRight={slideToNextItem} thumbs={thumbsFragment}>
                {carouselFragment}
            </CarouselWrapper>
        );
    };

    // vars
    // > use index for ID if ID not given for a slide
    // > we have to process IDs first because useSpringCarousel requires slides in its argument object
    slides = slides.map((slide, i) => {
        if (!slide.id) slide.id = i.toString();

        return slide;
    });
    if (!useTransition) {
        const { carouselFragment, slideToNextItem, slideToPrevItem, thumbsFragment, getCurrentActiveItem, slideToItem } = useSpringCarousel({
            items: slides as any,
            itemsPerSlide: perSlide,
            withLoop: loop,
            withThumbs: showThumbs,
        });
        return commons({
            carouselFragment,
            getCurrentActiveItem,
            slideToItem,
            slideToNextItem,
            slideToPrevItem,
            thumbsFragment,
        });
    } else {
        const { carouselFragment, slideToNextItem, slideToPrevItem, thumbsFragment, getCurrentActiveItem, slideToItem } = useTransitionCarousel({
            items: slides as any,
            withLoop: loop,
            withThumbs: showThumbs,
        });
        return commons({
            carouselFragment,
            getCurrentActiveItem,
            slideToItem,
            slideToNextItem,
            slideToPrevItem,
            thumbsFragment,
        });
    }
};

interface IThumb {
    isActive: boolean;
    onClick?: VoidFunction;
}

const Thumb: FunctionComponent<IThumb> = ({ isActive, onClick }) => <button onClick={onClick && onClick} className={`${!isActive ? "bg-gray-200" : "bg-blue-300"} rounded-md w-8 h-1 mr-2`}></button>;
