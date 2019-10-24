import React from "react";
import styled from "styled-components";

import Image from "./Image";
import theme from "../styles/theme";

const Styled = styled(Image)`
  border-radius: ${theme.radii.circle};
  border: ${theme.colors.backing} ${theme.borders.normal};
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
`;

const Avatar = props => <Styled {...props} src={props.image || props.src || 'https://steamcdn-a.opskins.media/steamcommunity/public/images/avatars/f2/f20f3036e3182ce5c31b33e512dfdd3251b47d33_full.jpg'} />;

Avatar.displayName = "Avatar";

export default Avatar;
