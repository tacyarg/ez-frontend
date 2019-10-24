import React, { useState } from "react";

import Assets from "../components/Assets";
import { Flex, Box, Avatar, Text, Divider } from "../primitives";

import Dropdown from "./Dropdown";

const Profile = p => {
  return (
    <Dropdown
      entries={[
        {
          label: "Settings",
          icon: Assets.Icons.UserCog,
          path: "/profile/settings"
        },
        {
          label: "Logout",
          icon: Assets.Icons.SignOut,
          path: "/profile/logout"
        }
      ]}
    >
      <Assets.Avatar />
      <Text color="black">Tacyarg</Text>
    </Dropdown>
  );
};

const Volume = p => {
  const [muted, setMuted] = useState(false);

  const toggleMute = () => {
    return setMuted(!muted);
  };

  return (
    <Box
      onClick={toggleMute}
      style={{
        cursor: "pointer"
      }}
    >
      {muted ? (
        <Assets.Icons.VolumeMute size={24} mx={2} />
      ) : (
        <Assets.Icons.VolumeUp size={24} mx={2} />
      )}
    </Box>
  );
};

export default p => {
  return (
    <Flex
      bg="offwhite"
      alignItems="center"
      // justifyContent="center"
    >
      <Assets.Logo mx={15} width={150} height={64} />
      <Box mx="auto" />
      <Divider type="vertical" bg="offwhiteBorder" />
      <Volume />
      <Divider type="vertical" bg="offwhiteBorder" />
      <Profile />
    </Flex>
  );
};
