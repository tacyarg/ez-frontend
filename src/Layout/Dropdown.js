import React, { useState, useEffect } from "react";
import { Flex, Box, Text } from "../primitives";
import { Link, NavLink } from "react-router-dom";
import Assets from "../components/Assets";

const UserMenu = ({ entries, children }) => {
  const [show, setShow] = useState(false);

  const toggleMenu = () => {
    return setShow(!show);
  };

  return (
    <Flex
      style={{
        cursor: "pointer",
        position: "relative"
      }}
      onMouseEnter={toggleMenu}
      onMouseLeave={toggleMenu}
      flexDirection="column"
    >
      <Flex alignItems="center">
        {children}
        <Assets.Icons.CaretDown bg="black" mx={2} size={20} />
      </Flex>
      {show ? <Menu entries={entries} /> : null}
    </Flex>
  );
};

const Menu = ({
  entries = [
    // {
    //   label: 'Settings',
    //   icon: FaCog,
    //   path: '/profile/settings',
    // },
  ]
}) => (
  <Flex
    bg="offwhite"
    flexDirection="column"
    width={1}
    style={{
      top: "100%",
      position: "absolute",
      boxShadow: "1px 2px 1px rgba(0, 0, 0, 0.25)"
    }}
  >
    {entries.map(row => (
      <Text.Link
        color="black"
        as={Flex}
        alignItems="center"
        // as={NavLink}
        to={row.path}
        key={row.label}
        p={2}
        style={{
          transition: "all 0.2s ease-in-out",
          ":hover": {
            backgroundColor: "rgba(0,0,0, 0.1)"
          }
        }}
      >
        <row.icon size={24} mx={2} />
        {row.label}
      </Text.Link>
    ))}
  </Flex>
);

export default UserMenu;
