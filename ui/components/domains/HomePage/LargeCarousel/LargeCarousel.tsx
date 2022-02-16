import { BasicCarousel, ICarouselSlide } from "components/base/Carousel/BasicCarousel";
import { FunctionComponent } from "react";

export const HomePageLargeCarousel: FunctionComponent = () => {
    // vars
    const items: Array<ICarouselSlide> = [
        {
            renderItem: (
                <div
                    className={`w-full h-full`}
                    style={{
                        backgroundImage: `url("https://miro.medium.com/max/1400/1*D5RLIuRqPGC5GB451_DfVQ.png")`,
                        backgroundSize: "cover",
                    }}
                >
                    &nbsp;
                </div>
            ),
        },
        {
            renderItem: (
                <div
                    className={`w-full h-full`}
                    style={{
                        backgroundImage: `url("https://cdn-bmiip.nitrocdn.com/DMQWzlmboCsXGmszMkFqUaSgMaWgavZl/assets/static/optimized/rev-cc5414c/blog/wp-content/uploads/2020/12/biotech-innovations-626x336.jpg")`,
                        backgroundSize: "cover",
                    }}
                >
                    &nbsp;
                </div>
            ),
        },
    ];

    return (
        <div className={`h-[96.3vh] w-full`}>
            <BasicCarousel slides={items} loop useTransition />
        </div>
    );
};
