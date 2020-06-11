import React from 'react';
import { SkipNavLink } from '@reach/skip-nav';

import Footer from '../footer';
import Head from '../head';
import Header from '../header';
import Steps from '../buildSteps';

import { Main } from './style';

interface LayoutProps {
  children: React.ReactNode;
  location: object;
}

/**
 * Main layout
 * @component
 *
 * @param   {object} location router location info
 * @returns {component}       <Layout location={location} />
 */
const Layout: React.FC<LayoutProps> = ({ children, location }) => (
  <>
    <Head location={location} />
    <SkipNavLink id="skip-nav-link">Skip to main content</SkipNavLink>
    <Header />
    <Main id="reach-skip-nav">
      {children}
      <Steps />
    </Main>
    <Footer />
  </>
);

export default Layout;
