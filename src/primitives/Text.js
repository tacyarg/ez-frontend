import React from "react";
import styled from "styled-components";
import {
  color,
  fontSize,
  fontWeight,
  lineHeight,
  space,
  textAlign,
  letterSpacing,
  fontFamily,
  style
} from "styled-system";

import theme from "../styles/theme";
import Box from "./Box";

const Text = styled(Box)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${p => (p.wrap ? "wrap" : "nowrap")};
  color: white;

  // letter-spacing: ${theme.letterSpacings.slight};
  // text-shadow: ${props => (props.color ? "0 0 0.05em" : "none")};

  // -webkit-font-smoothing: antialiased !important;
  // text-shadow: 1px 1px 1px rgba(0,0,0,0.004);

	${color}
	${fontSize}
	${fontWeight}
	${lineHeight}
	${space}
	${textAlign}
  ${letterSpacing}
  ${fontFamily}
`;

Text.displayName = "Text";

Text.defaultProps = {
  fontSize: [1, 2],
  fontWeight: "bold"
};

Text.Heading = ({ children, bold, ...props }) => {
  return (
    <Text
      fontSize={[7, 8, 9]}
      fontWeight="bold"
      letterSpacing="slight"
      fontFamily={bold ? "TTMussels-Bold" : "TTMussels"}
      {...props}
    >
      {children}
    </Text>
  );
};

Text.Number = ({ bold, money, value, ...props }) => {
  value = money
    ? value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })
    : value.toLocaleString(undefined, {
        maximumFractionDigits: 0
      });

  return <Text {...props}>{value}</Text>;
};

const textDecoration = style({
  prop: "textDecoration",
  cssProperty: "textDecoration"
});

Text.Link = styled(Text)`
  color: 
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  text-transform: uppercase;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: ${theme.radii.normal};
  letter-spacing: ${theme.letterSpacings.slight};
  opacity: ${p => (p.disabled ? 0.5 : 1)}

  &:hover,
  &:focus {
    opacity: 0.5;
  }
`;

Text.Link.defaultProps = {
  color: "lightGray",
  fontSize: 1,
  opacity: 1
};

export default Text;
