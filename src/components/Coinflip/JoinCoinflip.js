import React, { useEffect, useState } from "react";
import { Button, Flex } from "../../primitives";
import { Modals, Assets } from "../index";
import Wiring from "../../libs/wiring";

const ConnectedModal = Wiring.connectMemo(
  React.memo(({ socket, isOpen, toggleModal, selection, gameid }) => {
    return (
      <Modals.ItemDeposit.LocalInventory
        isOpen={isOpen}
        onClose={e => toggleModal()}
        onConfirm={itemids => {
          toggleModal()
          return socket.private.call('joinCoinflipFromInventory', {
            gameid,
            itemids,
            selection
          })
        }}
      />
    )
  }),
  p => {
    return {
      socket: p.socket,
      isOpen: p.isOpen,
      toggleModal: p.toggleModal,
      gameid: p.gameid,
      selection: p.selection,
    }
  }
)

export default React.memo(({ gameid, selection }) => {
  const [isOpen, setOpen] = useState(false)

  function toggleModal() {
    setOpen(!isOpen)
  }

  return (
    <>
      <ConnectedModal selection={selection} gameid={gameid} isOpen={isOpen} toggleModal={toggleModal} />
      <Button
        as={Flex}
        alignItems="center"
        type="primary"
        onClick={e => toggleModal()}
      >
        <Assets.Icons.Coins size={20} mr={2} bg="yellow" /> Join
      </Button>
    </>
  )
})