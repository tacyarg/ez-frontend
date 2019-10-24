import React from "react";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import styledNormalize from "styled-normalize";

import theme from "./styles/theme";
import GlobalCSS from "./styles/global";

const GlobalStyle = createGlobalStyle`
	${styledNormalize};
  ${GlobalCSS};
  `;
import { Page, Flex, Box } from "./primitives";

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Flex
        flex={1}
        flexDirection="column"
        width={1}
        height={"100vh"}
        style={{
          overflow: "hidden"
        }}
        style={{
          maxHeight: '100vh'
        }}
      >
        <GlobalStyle />
        {children}
      </Flex>
    </ThemeProvider>
  );
};

export default Theme;
