import { NextPage } from "next";

import { HomePageLargeCarousel, HomePageSections } from "components/domains";
import { AnnouncementBanner, Navbar, Page } from "components/layout";
import { useEffect } from "react";

const Home: NextPage = () => {
    return (
        <Page title={`Home | Sahara Africa`}>
            <div className={`relative`}>
                <AnnouncementBanner />

                <div className={`h-[90vh] w-full relative`}>
                    <div className={`sticky top-0 w-full bg-white`}>
                        <Navbar />
                    </div>
                    <HomePageLargeCarousel />
                </div>
                <div className={`mt-24 px-4`}>
                    <HomePageSections />
                </div>
            </div>
        </Page>
    );
};

export default Home;
