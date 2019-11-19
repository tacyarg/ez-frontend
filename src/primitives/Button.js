import React from "react";
import styled from "styled-components";
import { color, fontSize, space, width, themeGet } from "styled-system";

import theme from "../styles/theme";

import Text from "./Text";
import Flex from "./Flex";

// console.log(theme);

const type = props => {
  switch (props.type) {
    case "primary":
      return `
          box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
          color: ${theme.colorStyles.textOnPrimary.color};
          border: ${theme.colors.lightPrimary} ${theme.borders.normal};
          // background-color: ${theme.colorStyles.textOnPrimary.bgColor};
          background-image: linear-gradient(290deg, ${theme.colors.lightPrimary}, ${theme.colors.primary});
          // background-image: linear-gradient(290deg, #f03c3c, #df1111);
          
          &:hover,
          &:focus {
              opacity: 0.8
          };
        `;
    case "steam":
      return `
        box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
        color: ${theme.colors.offwhite};
        border: ${theme.colors.backingLight} ${theme.borders.normal};
        // background-color: ${theme.colorStyles.textOnPrimary.bgColor};
        background-image: linear-gradient(290deg, ${theme.colors.backingLight}, ${theme.colors.backingDark});
        // background-image: linear-gradient(290deg, #f03c3c, #df1111);
        
        &:hover,
        &:focus {
            opacity: 0.8
        };
      `;
    case "wax":
      return `
            box-shadow: 0 2px 0px ${theme.colors.orange};
            color: ${theme.colors.backingDark};
            border: ${theme.colors.orangeMuted} ${theme.borders.normal};
            // background-color: ${theme.colorStyles.textOnPrimary.bgColor};
            // background-image: linear-gradient(290deg, ${theme.colors.backingLight}, ${theme.colors.backingDark});
            // background-image: linear-gradient(290deg, #f03c3c, #df1111);
            
            &:hover,
            &:focus {
                background-color: ${theme.colors.orange};
                // background-image: linear-gradient(290deg, ${theme.colors.orange}, ${theme.colors.orangeMuted})
                opacity: 0.8
            };
          `;
    case "warning":
      return `
        box-shadow: 0 2px 0px rgba(0, 0, 0, .5);
        color: ${theme.colorStyles.textOnPrimary.color};
        border: #f03c3c ${theme.borders.normal};
        // background-color: ${theme.colorStyles.textOnPrimary.bgColor};
        background-image: linear-gradient(290deg, #f03c3c, #df1111);

        &:hover,
        &:focus {
            opacity: 0.8
        };
      `;
    case "simple":
      return `
        background-color: ${p =>
          p.active ? theme.colors.backingDark : theme.colors.backingLight};
        color: ${theme.colors.lightbacking};
        
        &:hover,
        &:focus {
          background-color: rgba(0,0,0,0.5);
          box-shadow: 0px 4px 2px -4px ${theme.colors.primary};
          color: ${props.disabled ? null : theme.colors.offwhite}
        };
    `;
    case "attention":
      return `
        background-color: ${p =>
          p.active ? theme.colors.orange : theme.colors.orangeMuted};
        color: ${theme.colors.text};
        
        &:hover,
        &:focus {
          background-color: rgba(0,0,0,0.5);
          box-shadow: 0px 4px 2px -4px ${theme.colors.orange};
          color: ${props.disabled ? null : theme.colors.orangeMuted}
        };
    `;
    case "simple-shaded":
      return `
        background-color: rgba(0,0,0,0.5);
        color: ${theme.colors.darkGray};

        &:hover,
        &:focus {
          box-shadow: 0px 2px 4px -4px ${theme.colors.primary};
          color: ${props.disabled ? null : theme.colors.primary}
        };
    `;
    default:
      return `
          background-color: rgba(0,0,0,0);
          color: ${theme.colors.gray};
          border: ${theme.colors.lightGray} ${theme.borders.normal};

          &:hover,
          &:focus {
            background-color: ${props.disabled ? null : theme.colors.lightGray}
          };
      `;
  }
};

const disabled = () => {
  return `
    pointer: not-allowed;
  `;
};

const Button = styled(Text)`
  text-transform: uppercase;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: ${theme.radii.normal};
  border: none;
  outline: none;   
  letter-spacing: ${theme.letterSpacings.slight};
  text-align:center;
  transition: all 0.2s ease-in-out;
  min-width: min-content;

  &:active {
    box-shadow: none;
    opacity: ${0.85};
  };
  
  opacity: ${p => (p.disabled ? 0.5 : 1)}

  justify-content: center;
  align-items: center;

	${color}
	${fontSize}
	${space}
	${width}
	${type}
`;

// const Button = props => (
//   <StyledButton {...props}>
//     <Text>{props.children}</Text>
//   </StyledButton>
// );

Button.defaultProps = {
  py: 2,
  px: 3
  // alignItems: 'center',
  // justifyContent: 'center'
};

Button.displayName = "Button";

export default Button;
