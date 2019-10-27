import React from "react";

import styled from "styled-components";
import {
  width,
  height,
  backgroundPosition,
  backgroundImage,
  backgroundSize
} from "styled-system";

import Box from "./Box";
import theme from "../styles/theme";

const clickable = props => {
  return `
      cursor: pointer;

      &:hover,
      &:focus {
        // background-color: 
      };
  `;
};

const Styled = styled(Box)`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  ${backgroundPosition}
  ${backgroundImage}
  ${backgroundSize}
  ${height}
  ${width}
  ${clickable}

  mask: url('${p => p.src}') no-repeat ;
`;

Styled.displayName = "Icon";

Styled.defaultProps = {
  borderRadius: "normal",
  size: 28
};

export default Styled;
