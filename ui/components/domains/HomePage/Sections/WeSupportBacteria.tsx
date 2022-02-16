import { InformationSection } from "components/layout";
import { FunctionComponent } from "react";

export const WeSupportBacteria: FunctionComponent = () => {
    // jsx
    const left = (
        <div className={`w-1/2 py-14 pr-4`}>
            <h3 className={`text-3xl`}>We love bacteria!</h3>
            <div className={`mt-6`}>
                Give a bug a bad name and hang it! Humans have come to associate severe illnesses with bacterial action &ldash; and we are mostly right.
                <br />
                But bacteria are also forces for good. They are responsible for several processes that life would be impossible without. <br />
                We are devoted to giving these microbes a chance to show all the good they are capable of doing!
            </div>
        </div>
    );
    const right = (
        <div className={`w-1/2 py-14 pl-4`}>
            Blah blah blah and some more blah. Blah blah blah and some more blah. Blah blah blah and some more blah. Blah blah blah and some more blah. Blah blah blah and some more blah. Blah blah
            blah and some more blah. Blah blah blah and some more blah. Blah blah blah and some more blah.
        </div>
    );

    return <InformationSection leftPanel={left} rightPanel={right} />;
};
