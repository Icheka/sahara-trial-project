import { FunctionComponent, ReactNode } from "react";

export interface IInformationSection {
    leftPanel: ReactNode;
    rightPanel: ReactNode;
}

export const InformationSection: FunctionComponent<IInformationSection> = ({ leftPanel, rightPanel }) => (
    <section className={`w-full flex`}>
        {leftPanel}
        {rightPanel}
    </section>
);
