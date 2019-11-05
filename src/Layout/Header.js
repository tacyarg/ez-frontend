import React, { useState } from "react";

import Assets from "../components/Assets";
import { Button, Flex, Box, Avatar, Text, Divider } from "../primitives";

import Dropdown from "./Dropdown";
import Wiring from "../libs/wiring";
import Buttons from "../components/Buttons";

const Profile = Wiring.connectMemo(
  p => {
    // console.log(p);

    return p.user ? (
      <Dropdown
        entries={[
          {
            label: "Settings",
            icon: Assets.Icons.UserCog,
            onClick: () => {
              // window.localStorage.setItem('tokenid')
              return p.history.push('/settings')
            }
          },
          {
            label: "Logout",
            icon: Assets.Icons.SignOut,
            onClick: () => {
              // window.localStorage.setItem('tokenid')
              return p.socket.auth.call("logout");
            }
          }
        ]}
      >
        <Assets.Avatar src={p.user.avatar} as={Avatar} />
        <Text color="black">{p.user.username}</Text>
      </Dropdown>
    ) : (
      <>
      <Buttons.LoginSteam />
      <Buttons.LoginWax />
      </>
    );
  },
  p => {
    return { history: p.history, user: p.private.me, socket: p.socket };
  }
);

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
      height={64}
    >
      <Assets.Logo mx={15} width={150} height={64} />
      <Box mx="auto" />
      <Divider type="vertical" bg="offwhiteBorder" />
      <Volume />
      <Divider type="vertical" bg="offwhiteBorder" />
      <Profile history={p.history}/>
    </Flex>
  );
};
