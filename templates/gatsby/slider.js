// npm i --save re-resizable

import React from 'react';
import PropTypes from 'prop-types';
import { Resizable } from 're-resizable';
import Image from './images';

const sliderImgs = {
  height: '580px',
};

const contentLvl = {
  maxWidth: '305px',
};

const contentLeft = {
  bottom: '30px',
  left: '45px',
  zIndex: '15',
  ...contentLvl,
};

const contentRight = {
  bottom: '30px',
  right: '45px',
  zIndex: '5',
  ...contentLvl,
};

const leftImgWrap = {
  left: '0',
  zIndex: '10',
  ...sliderImgs,
};

const leftImg = {
  objectPosition: 'left center',
};

const rightImg = {
  objectPosition: 'right center',
};

const rightImgWrap = {
  right: '0',
  zIndex: '1',
  ...sliderImgs,
};

const wrapStyle = {
  overflow: 'hidden',
  position: 'absolute',
};

const Slider = ({
  height,
  leftAlt,
  leftContent,
  leftImage,
  rightAlt,
  rightContent,
  rightImage,
}) => (
  <section className="flex items-center justify-start relative w-100 resizable">
    <Resizable
      defaultSize={{
        height,
        width: '30%',
      }}
      enable={{
        bottom: false,
        bottomLeft: false,
        bottomRight: false,
        left: false,
        right: true,
        top: false,
        topLeft: false,
        topRight: false,
      }}
      handleClasses={{ right: 'resizable-handle' }}
      lockAspectRatio={false}
      maxHeight={height}
      maxWidth="70%"
      minWidth="30%"
      style={wrapStyle}
    >
      <p className="" style={contentLeft}>
        {leftContent}
      </p>
      <Image
        filename={leftImage}
        alt={leftAlt}
        style={leftImgWrap}
        imgStyle={leftImg}
      />
    </Resizable>
    <div className="absolute flex flex-column items-end justify-end w-100 resizable-inner">
      <p className="" style={contentRight}>
        {rightContent}
      </p>
      <Image
        filename={rightImage}
        alt={rightAlt}
        style={rightImgWrap}
        imgStyle={rightImg}
      />
    </div>
  </section>
);

Slider.propTypes = {
  height: PropTypes.number.isRequired,
  leftAlt: PropTypes.string.isRequired,
  leftContent: PropTypes.string.isRequired,
  leftImage: PropTypes.string.isRequired,
  rightAlt: PropTypes.string.isRequired,
  rightContent: PropTypes.string.isRequired,
  rightImage: PropTypes.string.isRequired,
};

export default Slider;
