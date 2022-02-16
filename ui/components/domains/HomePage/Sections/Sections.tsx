import { FunctionComponent } from "react";
import { OurGutHealthSolutions } from "./OurGutHealthSolutions";
import { WeSupportBacteria } from "./WeSupportBacteria";

export const HomePageSections: FunctionComponent = () => (
    <>
        <WeSupportBacteria />
        <OurGutHealthSolutions />
    </>
);
