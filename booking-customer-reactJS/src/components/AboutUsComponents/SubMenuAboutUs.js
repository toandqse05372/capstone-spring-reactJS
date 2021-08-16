import React from 'react';
import AboutUsComp from './AboutUsComp/AboutUsComp';
import HowToOrder from './AboutUsComp/HowToOrder';
import Contact from './AboutUsComp/Contact';
import PolicynPrivacy from './AboutUsComp/PolicynPrivacy';
import TermsConditions from './AboutUsComp/TermsConditions';
import HowItWorks from './AboutUsComp/HowItWorks';
import FAQ from './AboutUsComp/FAQ';




const SubMenuAboutUs = [
    {
        path: '/aboutUs/us',
        exact: false,
        main: ({ history, location, match }) => <AboutUsComp history={history} location={location} match={match}  />
    }, 
    {
        path: '/aboutUs/howToOrder',
        exact: false,
        main: ({ history, location, match }) => <HowToOrder history={history} location={location} match={match}  />
    }, 
    {
        path: '/aboutUs/contact',
        exact: false,
        main: ({ history, location, match }) => <Contact history={history} location={location} match={match}  />
    }, 
    {
        path: '/aboutUs/policy',
        exact: false,
        main: ({ history, location, match }) => <PolicynPrivacy history={history} location={location} match={match}  />
    }, 
    {
        path: '/aboutUs/termsConditions',
        exact: false,
        main: ({ history, location, match }) => <TermsConditions history={history} location={location} match={match}  />
    }, 
    {
        path: '/aboutUs/howItWorks',
        exact: false,
        main: ({ history, location, match }) => <HowItWorks history={history} location={location} match={match}  />
    }, 
    {
        path: '/aboutUs/FAQ',
        exact: false,
        main: ({ history, location, match }) => <FAQ history={history} location={location} match={match}  />
    }, 
];
export default SubMenuAboutUs;