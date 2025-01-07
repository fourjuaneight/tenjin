import React from "react";
import { SkipNavLink } from "@reach/skip-nav";

import Footer from "../footer";
import Head from "../head";
import Header from "../header";

interface LayoutProps {
  children: React.ReactNode;
  location: object;
}

/**
 * Main layout
 */
const Layout: React.FC<LayoutProps> = ({ children, location }): React.FC => (
  <>
    <Head location={location} />
    <SkipNavLink id="skip-nav-link">Skip to main content</SkipNavLink>
    <Header />
    <main id="reach-skip-nav">
      {children}
      <Steps />
    </main>
    <Footer />
  </>
);

export default Layout;
