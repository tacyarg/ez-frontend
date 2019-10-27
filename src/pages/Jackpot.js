import React, { useState } from "react";

import { Flex, Box, Text, Button } from "../primitives";
import Spinner from "../components/Spinner";
import Cards from "../components/Cards";
import Assets from "../components/Assets";
import Modal from "../components/Modals";

const BetItems = ({
  items = ["3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3"]
}) => {
  return (
    <Flex width={1} p={1}>
      {items.map(item => {
        return <Cards.JackpotItem key={item.id} {...item} />;
      })}
    </Flex>
  );
};

const Bets = ({ bets = ["1", "1", "1", "1"] }) => {
  return (
    <Flex
      width={1}
      flexWrap="wrap"
      justifyContent={"space-between"}
      flexDirection={["column", "row"]}
      justifyContent="center"
    >
      {bets.map((b, index) => {
        return <Cards.JackpotBet index={b.id || index} bet={b} m={2} />;
      })}
    </Flex>
  );
};

const Rule = ({ children, ...p }) => {
  return (
    <Text
      borderRadius="normal"
      bg="subnavbg"
      fontWeight="normal"
      p={2}
      fontSize={1}
      mx={1}
      {...p}
    >
      {children}
    </Text>
  );
};

const Rules = p => {
  return (
    <Flex width={1} justifyContent="center">
      <Flex justifyContent="space-between" my={2}>
        <Rule>SKIN LIMIT: 20</Rule>
        <Rule>MIN BET: 1.00</Rule>
        <Rule>MAX BET: ∞</Rule>
      </Flex>
    </Flex>
  );
};

const CurrentRound = p => {
  return (
    <>
      <Rules />
      <BetItems />
      <Spinner />
      <Bets />
    </>
  );
};

const History = p => {
  return <Box>{/* do somthing relevant */}</Box>;
};

const Nav = ({ onDeposit }) => {
  return (
    <Box p={2} width={1} bg="subnavbg">
      <Flex alignItems="center" p={2} border="thick" borderColor="backingLight">
        <Button type="primary" onClick={onDeposit}>
          Deposit
        </Button>
        <Box mx="auto" />
        <Text>Win Chance: 0%</Text>
      </Flex>
    </Box>
  );
};

export default p => {
  const [isOpen, setOpen] = useState(true);

  function toggleModal() {
    setOpen(!isOpen);
  }

  return (
    <>
      <Nav onDeposit={e => toggleModal()} />
      <Modal.Deposit
        isOpen={isOpen}
        onClose={e => toggleModal()}
        onConfirm={e => toggleModal()}
      />
      <CurrentRound />
      <History />
    </>
  );
};
