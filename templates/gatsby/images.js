import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const Image = props => (
  <StaticQuery
    query={graphql`
      query {
        allImageSharp {
          edges {
            node {
              fluid(maxWidth: 640, maxHeight: 320) {
                ...GatsbyImageSharpFluid
                originalName
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.allImageSharp.edges.find(edge =>
        edge.node.fluid.originalName.includes(props.filename)
      );
      if (!image) {
        return null;
      }

      return (
        <Img
          fluid={image.node.fluid}
          alt={props.alt}
          style={props.style}
          imgStyle={props.imgStyle}
        />
      );
    }}
  />
);

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  imgStyle: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
};

export default Image;
