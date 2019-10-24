import React from "react";

import styled from "styled-components";
import { width, height, backgroundPosition, backgroundImage, backgroundSize } from "styled-system";

import Box from "./Box";

const Styled = styled(Box)`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  ${backgroundPosition}
  ${backgroundImage}
  ${backgroundSize}
  ${height}
  ${width}

  mask: url('${p => p.src}') no-repeat ;
`;

Styled.displayName = "Icon";

Styled.defaultProps = {
  borderRadius: "normal",
  size: 28
};

export default Styled;
