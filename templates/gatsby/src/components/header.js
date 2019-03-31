import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import avatar from '../images/icon.png';
import twitter from '../images/twitter.svg';
import github from '../images/github.svg';
import rss from '../images/rss.svg';

const date = new Date();
const offset = date.getTimezoneOffset() * 60000;
const iso = new Date(Date.now() - offset).toISOString();
const year = iso.substring(0, 4);

const Header = ({ siteTitle, author }) => {
  return (
    <div>
      <header>
        <div>
          <Link to="/" aria-label="Juan Villela Dot Blog">
            <img
              src={avatar}
              alt="Juan's avatar"
              style={{ height: `80px`, width: `80px` }}
            />
            <h1>{siteTitle}</h1>
          </Link>
        </div>
        <nav>
          <Link to="/archive">Archive</Link>
          <Link to="/bookshelf">Bookshelf</Link>
          <Link to="/about-me">About Me</Link>
          <div>
            <a
              href="https://twitter.com/fourjuaneight"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <img
                src={twitter}
                alt="Juan's Twitter"
                style={{ height: `20px`, width: `20px` }}
              />
            </a>
            <a
              href="https://github.com/fourjuaneight"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
            >
              <img
                src={github}
                alt="Juan's Github"
                style={{ height: `20px`, width: `20px` }}
              />
            </a>
            <Link to="/rss.xml" aria-label="RSS Feed">
              <img
                src={rss}
                alt="RSS Feed"
                style={{ height: `20px`, width: `20px` }}
              />
            </Link>
          </div>
        </nav>
      </header>
      <footer>
        <nav>
          <Link to="/archive">Archive</Link>
          <Link to="/bookshelf">Bookshelf</Link>
          <Link to="/about-me">Stuff</Link>
        </nav>
        <p>
          &copy; {year} {author}
        </p>
      </footer>
    </div>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Header;
