import React from "react";
import styled from "styled-components";
import { space, color } from "styled-system";

import Box from "./Box";

const type = props => {
  switch (props.type) {
    case "vertical":
      return `
        height: 100%;
        min-width: 1px;
        width: 1px;
      `;
    default:
      return `
        min-height: 1px;
        hight: 1px;
        width: 100%;
      `;
  }
};

const Divider = styled(Box)`
  flex-shrink: 0;

  ${space}
  ${type}
`;

Divider.propTypes = {
  ...color.propTypes,
  ...space.propTypes
};

Divider.defaultProps = {
  bg: "backing"
};

Divider.displayName = "Divider";

export default Divider;
