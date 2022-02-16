import { FunctionComponent, ReactNode } from "react";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ICarouselWrapper {
    navigateLeft: VoidFunction;
    navigateRight: VoidFunction;
    thumbs?: JSX.Element;
}

export const CarouselWrapper: FunctionComponent<ICarouselWrapper> = ({ children, navigateLeft, navigateRight, thumbs }) => {
    return (
        <div className={`flex justify-between relative items-center h-full w-full px-6`}>
            <NavButton onClick={navigateLeft} to={"left"} />
            <div className={`absolute inset-0 -z-10 h-full w-full`}>{children}</div>
            <NavButton onClick={navigateRight} to={"right"} />
            {thumbs && (
                <div className={`absolute w-full left-0 bottom-12 bg-transparent`}>
                    <div className={`relative w-full`}>
                        <div className={`absolute left-1/2 -ml-[5%] h-full`}>{thumbs}</div>
                        {thumbs.props.isActive}
                    </div>
                </div>
            )}
        </div>
    );
};

interface INavButton {
    to: "left" | "right";
    onClick: VoidFunction;
}

const NavButton: FunctionComponent<INavButton> = ({ to, onClick }) => (
    <button onClick={onClick} className={`hover:bg-white rounded-full p-[3px] text-white hover:text-gray-600 transition duration-300 text-sm`}>
        {to === "left" ? <FaArrowLeft /> : <FaArrowRight />}
    </button>
);
