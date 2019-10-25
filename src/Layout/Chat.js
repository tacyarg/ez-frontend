import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Assets from "../components/Assets";
import {
  Button,
  Flex,
  Box,
  Text,
  Image,
  Sidebar,
  Page,
  Divider,
  Navbar,
  Avatar,
  Input
} from "../primitives";

import FakeChat from "../libs/fake/messages";

const Online = p => {
  const [count, setCount] = useState(100);

  return (
    <Flex alignItems="center" justifyContent="center">
      {count}
      <Assets.Icons.User bg="red" ml={2} size={18} />
    </Flex>
  );
};

const Heading = p => {
  return (
    <Flex width={1} p={2}>
      <Assets.Social.Twitter bg="red" size={18} />
      <Box mx={1} />
      <Assets.Social.Discord bg="red" size={18} />
      <Box mx="auto" />
      <Online />
    </Flex>
  );
};

const Room = ({ messages = FakeChat() }) => {
  return (
    <Flex
      flexDirection="column"
      m={2}
      width={1}
      style={{
        "flex-shrink": 0
      }}
    ></Flex>
  );
};

export default p => {
  const [messages, setMessages] = useState(FakeChat());
  const [pauseScroll, setPauseScroll] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let chatElement = null;

  const scrollToBottom = () => {
    if (pauseScroll) return;

    const scrollHeight = chatElement.scrollHeight;
    const height = chatElement.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(chatElement).scrollTop =
      maxScrollTop > 0 ? maxScrollTop : 0;
  };

  const handleKeyPress = event => {
    if (loading) return;
    if (event.key == "Enter") {
      sendChatMessage();
    }
  };

  useEffect(() => {
    // sessionScope.on('change', setSessions)
    // chatScope.on('messages', setMessages)

    scrollToBottom();

    return () => {
      // chatScope.disconnect()
      // sessionScope.disconnect()
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  });

  const sendChatMessage = () => {
    // TODO: do somthing relevant...
  };

  return (
    <Sidebar p={2} width={330} bg="backingDark" alignItems="center">
      <Heading />
      {/* <Text fontSize={4} color="text">
        Chat
      </Text> */}

      <Flex
        flex={1}
        my={3}
        bg="backingLight"
        style={{
          border: "1px solid #1b1b1b",
          overflowY: "auto",
          overflowX: "hideen",
          overflowWrap: "break-word"
        }}
        flexDirection="column"
        onMouseEnter={e => setPauseScroll(true)}
        onMouseLeave={e => {
          setPauseScroll(false);
          scrollToBottom();
        }}
        ref={el => {
          chatElement = el;
        }}
      >
        {messages.map((m, k) => {
          return (
            <Box m={2} key={m.id || k}>
              <Flex alignItems="center" p={1}>
                <Avatar size={30} src={m.image} mr={2} />
                <Text fontWeight="bold" letterSpacing="slight" mr={2}>
                  {m.username}
                </Text>
              </Flex>
              <Divider my={1} />
              <Text wrap="true" fontWeight="normal" color="subtext">
                {m.message}
              </Text>
            </Box>
          );
        })}
      </Flex>

      <Input onKeyDown={handleKeyPress} placeholder="Say something..." />
    </Sidebar>
  );
};
