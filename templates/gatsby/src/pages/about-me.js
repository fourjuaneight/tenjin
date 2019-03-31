import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout';

const About = ({ location }) => {
  return (
    <Layout location={location}>
      <div>
        <h1>About Me</h1>
        <p>
          I'm Juan and I make websites for a living. This site serves as a
          testing ground for new web technologies I'm learning and a place to
          share how try to automate stuff in my life. I might share something
          other stuff. There's a bookshelf in case you're interested. But if I'm
          completely honest, there's usually too much stuff in my head and I
          need a place to offload all of that so it doesn't keep me up at night.
          So I guess that's really what this site is for.
        </p>
        <p>Anyways, subscribe to the feeds:</p>
        <p>
          Yes, I know they're JSON. Yes, they should work on your RSS reader.
        </p>
      </div>
    </Layout>
  );
};

About.propTypes = {
  location: PropTypes.object.isRequired,
};

export default About;
