import styled from "styled-components";
import { Flex, Box } from "./";


const Page = styled(Box)`
  // margin: 0 auto;
  // height: 100vh;
  height: 100%;
  // width: 100%;
  // min-height: 100vh !important;

  flex: 1;

  overflow: hidden;
  overflow-y: auto;
`;

Page.displayName = "Page";

Page.defaultProps = {
  flexDirection: "column",
  // justifyContent: 'center',
  alignItems: "center"
};

export default Page;
