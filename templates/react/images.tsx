import Img from "gatsby-image";
import React from "react";
import { StaticQuery, graphql } from "gatsby";

interface StaticQueryProps {
  data: {
    allImageSharp: {
      edges: {
        node: {
          fluid: {
            originalName: string;
          };
        };
      };
    };
  };
}

interface ImageProps {
  alt: string;
  filename: string;
  imgStyle: { [property: string]: string };
  style: { [property: string]: string };
}

/**
 * Static Image Query
 * Queries all images at a set max-width and allows filtering of specific image via props
 *
 * @param alt alt text
 * @param filename image relative filename
 * @param imgStyle img styles
 * @param style wrapper container styles
 */
const Image: React.FC<ImageProps> = ({
  alt,
  filename,
  imgStyle,
  style,
}): React.FC => (
  <StaticQuery
    query={graphql`
      query {
        allImageSharp {
          edges {
            node {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid_withWebp
                originalName
              }
            }
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => {
      const image = data.allImageSharp.edges.find((edge) =>
        edge.node.fluid.originalName.includes(filename)
      );

      if (!image) {
        return null;
      }

      return (
        <Img
          fluid={image.node.fluid}
          alt={alt}
          style={style}
          imgStyle={imgStyle}
        />
      );
    }}
  />
);
export default Image;
