import { Button, TransparentLogo } from "components/base";
import { CollapsibleSearch } from "components/domains";
import { FunctionComponent } from "react";
import { FaShoppingCart } from "react-icons/fa";
import StickyNav from "react-sticky-nav";

export const Navbar: FunctionComponent = () => {
    return (
        <StickyNav>
            <Nav />
        </StickyNav>
    );
};

const Nav: FunctionComponent = () => (
    <nav className={`flex justify-between items-center px-4 py-2 bg-transparent`}>
        <div>
            <TransparentLogo />
        </div>
        <div></div>
        <div className={`flex gap-2 items-center`}>
            <CollapsibleSearch />
            <FaShoppingCart color={`grey`} />
            <Button useDefaultPadding>Login</Button>
            <Button useDefaultPadding>Activate</Button>
        </div>
    </nav>
);
