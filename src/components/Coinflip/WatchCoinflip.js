import React, { useEffect, useState } from "react";
import { Button, Flex } from "../../primitives";

import { Modals, Assets } from "../index";
import Wiring from "../../libs/wiring";

const WatchCoinflipModal = ({coinflips, socket, gameid}) => {
  // console.log('WatchCoinflipModal', coinflips, socket, gameid)
  const [isOpen, setOpen] = useState(false);

  function toggleModal() {
    setOpen(!isOpen);
  }

  return (
    <>
      <Modals.WatchCoinflip
        isOpen={isOpen}
        onClose={e => toggleModal()}
        onConfirm={toggleModal}
        coinflip={coinflips[gameid]}
      />
      <Button
        mt={[3, 0]}
        as={Flex}
        alignItems="center"
        type="simple"
        onClick={e => {
          toggleModal();
        }}
      >
        Watch
        {/* <Assets.Icons.Watch size={20} mr={2} bg="yellow" /> Create Coinflip */}
      </Button>
    </>
  );
};

export default Wiring.connectMemo(WatchCoinflipModal, p => {
  return {
    socket: p.socket,
    coinflips: p.public.coinflips
  };
});
