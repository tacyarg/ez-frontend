import styled from "styled-components";
import {
  borderRadius,
  space,
  width,
  height,
  color,
  order,
  position,
  top,
  right,
  bottom,
  left,
  size,
  textAlign,
  minWidth,
  maxWidth,
  maxHeight,
  minHeight,
  border,
  borderRight,
  borderBottom,
  borderTop,
  borderLeft,
  fontFamily,
  boxShadow,
  zIndex
} from "styled-system";
import theme from "../styles/theme";

const Box = styled.div`
  box-sizing: border-box;

  // shadow-bottom: ${p =>
    p.shadowBottom ? "0px 10px 10px -10px black" : "none"}
  // shadow-top: ${p => (p.shadowTop ? "0px -10px 10px -10px black" : "none")}

  ${zIndex}
  ${boxShadow}
	${borderRadius}
  ${border}
  ${borderRight}
  ${borderLeft}
  ${borderTop}
  ${borderBottom}
	${color}
	${order}
	${position}
	${top}
	${right}
	${bottom}
	${left}
	${space}
	${textAlign}
	${size}
  ${width}
  ${height}
  ${minWidth}
  ${maxWidth}
  ${minHeight}
  ${maxHeight}
  ${fontFamily}


  ::-webkit-scrollbar {
    background-color: ${theme.colors.black};
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background: ${theme.colors.scrollbar};
    /* background: -webkit-linear-gradient(@GALeft 0%, @GARight 82%);
    background: -o-linear-gradient(@GALeft 0%, @GARight 82%);
    background: linear-gradient(@GALeft 0%, @GARight 82%); */
  }

  ::-webkit-scrollbar-track {
    background-color: ${theme.colors.scrollbarTrack};
  }
`;

Box.displayName = "Box";

export default Box;
