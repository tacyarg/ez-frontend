import React, { useEffect, useState } from "react";
import { Assets } from "../index";

const CoinSide = ({ selection }) => {
  switch (selection) {
    case "heads":
      return (
        <Assets.Coinflip.tCoin
          top={0}
          left={0}
          position="absolute"
          size={[12, 24]}
          m={0}
        />
      );
    case "tails":
      return (
        <Assets.Coinflip.ctCoin
          top={0}
          left={0}
          position="absolute"
          size={[12, 24]}
          m={0}
        />
      );
    default:
      return null;
  }
};

export default CoinSide;
