import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  Modal,
  Divider,
  Input,
  Page
} from "../primitives";
import Cards from "./Cards";
import Assets from "./Assets";
import Wiring from "../libs/wiring";

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const debouncedSearchTerm = useDebounce(search, 500);
  useEffect(() => {
    if (search.length < 2) return;
    onSearch(search);
  }, [debouncedSearchTerm]);

  return (
    <Input
      value={search}
      placeholder="Search..."
      onChange={e => {
        setSearch(e.target.value.toString().toLowerCase());
      }}
    />
  );
};

const WiredModal = ({
  children,
  isOpen,
  title = "Ello Moto",
  onSearch,
  onConfirm,
  onClose,
  ...p
}) => {
  return (
    <Modal isOpen={isOpen} width={[1, 2 / 3]} m={4}>
      <Flex width={1} p={3}>
        <Text.Heading fontSize={6}>{title}</Text.Heading>
        <Box mx="auto" />
        <Assets.Icons.Close onClick={onClose} clickable />
      </Flex>
      <Divider />
      <Box
        p={4}
        maxHeight={400}
        style={{
          overflow: "hidden",
          overflowY: "auto"
        }}
      >
        {children}
      </Box>
      <Divider />

      <Flex width={1} p={3}>
        {onSearch && <Search onSearch={onSearch} />}
        <Box mx="auto" />
        <Button mx={1} type="primary" onClick={onConfirm}>
          Confirm
        </Button>
        <Button mx={1} type="warning" onClick={onClose}>
          Cancel
        </Button>
      </Flex>
    </Modal>
  );
};

WiredModal.Deposit = Wiring.connect(
  React.memo(({ items = [], ...p }) => {
    return (
      <WiredModal {...p} onSearch={console.log}>
        <Flex width={1} p={1} flexWrap="wrap" justifyContent="center">
          {items.length > 0 ? (
            items.map(item => {
              return <Cards.JackpotItem key={item.id} {...item} />;
            })
          ) : (
            <Box>
              <Text>You do not have any items.</Text>
              {/* <Button m={2}type="simple">View Inventory</Button> */}
            </Box>
          )}
        </Flex>
      </WiredModal>
    );
  }),
  p => {
    return {
      items: p.inventory
    };
  }
);

export default WiredModal;
