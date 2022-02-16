import { FunctionComponent, useState } from "react";
import { FaSearch } from "react-icons/fa";

export const CollapsibleSearch: FunctionComponent = () => {
    // state
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div>
            <div>
                <FaSearch color={`grey`} />
            </div>
        </div>
    );
};
