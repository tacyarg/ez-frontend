import React from "react";
import { Box} from "../primitives";

import levels from "../assets/images/levels/*.png";

export default ({ rank = 1 }) => {
  const src = levels[`level(${rank})`];
  return <Box as={"img"} src={src} size={25} mr={2} />;
};
