import React, { useState, useEffect, useMemo } from "react";
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

import Level from "../components/Level";
import Wiring from "../libs/wiring";

const Online = Wiring.connectMemo(
  ({ online = 100 }) => {
    console.log("Online", online);

    const [count, setCount] = useState(online);

    return (
      <Flex alignItems="center" justifyContent="center">
        {count}
        <Assets.Icons.User bg="red" ml={2} size={18} />
      </Flex>
    );
  },
  p => {
    return {
      online: p.online
    };
  }
);

const Clock = Wiring.connectMemo(
  ({ time = Date.now() }) => {
    console.log("Clock", time);

    return (
      <Text fontSize={1} color="text">
        {time}
      </Text>
    );
  },
  p => {
    return {
      time: p.time
    };
  }
);

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

const SendChatMessage = () => {
  const [message, setMessage] = useState("");
  const handleKeyPress = event => {
    if (event.key == "Enter") {
      dispatchMessage();
    }
  };

  const dispatchMessage = () => {
    if (message.length < 1) return;
    Wiring.dispatch("sendChatMessage")(message);
    setMessage("");
  };

  return (
    <Input
      width={1}
      value={message}
      onKeyDown={handleKeyPress}
      onChange={e => setMessage(e.target.value)}
      placeholder="Say something..."
    />
  );
};

const Chat = p => {
  console.log("Chat", p);
  const { chat } = p;

  const [pauseScroll, setPauseScroll] = useState(false);

  let chatElement = null;

  const scrollToBottom = () => {
    if (pauseScroll) return;

    const scrollHeight = chatElement.scrollHeight;
    const height = chatElement.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(chatElement).scrollTop =
      maxScrollTop > 0 ? maxScrollTop : 0;
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <Sidebar p={2} width={330} bg="backingDark" alignItems="center">
      <Heading />
      {/* <Clock /> */}

      <Flex
        width={1}
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
        {chat.messages.map((m, k) => {
          return (
            <Box m={2} key={m.id || k}>
              <Flex alignItems="center" p={1}>
                <Avatar size={30} src={m.image} mr={2} />
                <Level rank={m.rank} />
                <Text
                  fontWeight="bold"
                  letterSpacing="slight"
                  mr={2}
                  color="offwhite"
                >
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
      <SendChatMessage />
    </Sidebar>
  );
};

export default Wiring.connectMemo(Chat, p => {
  return {
    chat: p.chat
  };
});
