import React, {FC} from 'react';
import Hero from "./components/Hero";
import Companies from "./components/Companies";

const LandingPage: FC = () => {

    return (
        <>
            <Hero/>
            <Companies/>
        </>
    );
};

export default LandingPage;

