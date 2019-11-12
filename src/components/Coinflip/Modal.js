import React, { useEffect, useState } from "react";
import { Button, Flex } from "../../primitives";

import { Modals, Assets } from "../index";
import Wiring from "../../libs/wiring";

const CreateCoinflipModal = p => {
  const [isOpen, setOpen] = useState(false);

  function toggleModal() {
    setOpen(!isOpen);
  }

  return (
    <>
      <Modals.CreateCoinflip
        isOpen={isOpen}
        onClose={e => toggleModal()}
        onConfirm={(itemids, selection) => {
          toggleModal();
          return p.socket.private.call("createCoinflipFromInventory", {
            selection,
            itemids
          });
        }}
      />
      <Button
        mt={[3, 0]}
        as={Flex}
        alignItems="center"
        type="primary"
        onClick={e => {
          toggleModal();
        }}
      >
        <Assets.Icons.Coins size={20} mr={2} bg="yellow" /> Create Coinflip
      </Button>
    </>
  );
};

export default Wiring.connectMemo(CreateCoinflipModal, p => {
  return {
    socket: p.socket
  };
});
