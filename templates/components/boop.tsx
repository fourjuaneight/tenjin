import React, { FunctionComponent, ReactNode } from "react";
import { animated } from "react-spring";

import useBoop, { UseBoopProps } from "./useBoop";

export interface BoopProps {
  children: ReactNode;
  boopConfig: UseBoopProps;
}

/**
 * Spring based boop animation wrapper.
 * @function
 *
 * @param   {ReactNode}         children
 * @param   {UseBoopProps}      boopConfig
 *
 * @returns {FunctionComponent} <Boop />
 */
export const Boop: FunctionComponent<BoopProps> = ({
  children,
  boopConfig,
}): FunctionComponent => {
  const [style, trigger] = useBoop(boopConfig);

  return (
    <animated.button onMouseEnter={trigger} style={style}>
      {children}
    </animated.button>
  );
};
