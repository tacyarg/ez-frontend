import React, { useEffect, useState } from "react";
import { Assets } from "../index";

const CoinSide = ({ selection, ...p }) => {
  switch (selection) {
    case "heads":
      return (
        <Assets.Coinflip.tCoin
          top={0}
          left={0}
          size={[12, 24]}
          m={0}
          {...p}
        />
      );
    case "tails":
      return (
        <Assets.Coinflip.ctCoin
          top={0}
          left={0}
          size={[12, 24]}
          m={0}
          {...p}
        />
      );
    default:
      return null;
  }
};

export default CoinSide;
