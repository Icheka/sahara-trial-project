import { InformationSection } from "components/layout";
import { FunctionComponent } from "react";

export const OurGutHealthSolutions: FunctionComponent = () => {
    // jsx
    const left = (
        <div
            className={`w-1/2 h-80`}
            style={{ backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKid5-EH5kqbmsryUrR5rJxf_WaLjuaxHcFw&usqp=CAU")`, backgroundSize: "cover" }}
        >
            &nbsp;
        </div>
    );
    const right = (
        <div className={`w-1/2 pl-8`}>
            <h3>Our Gut health solutions</h3>
            <div>Start your wellness journey with our Gut Health Test</div>
            <div>Blah blah blah</div>
        </div>
    );

    return <InformationSection leftPanel={left} rightPanel={right} />;
};
