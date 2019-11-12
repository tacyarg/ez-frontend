import React, { useEffect, useState } from "react";
import {
  Box,
} from "../primitives";


const Badge = ({ value, color, money }) => {
  return (
    <Box
      p={2}
      bg={color}
      borderRadius="normal"
      style={{
        boxShadow: "1px 2px 1px rgba(0, 0, 0, 0.25)",
        color: money ? "#e2c957" : null
      }}
    >
      {money && "$"}
      {Number(value).toLocaleString(undefined, {
        minimumFractionDigits: money ? 2 : 0,
        maximumFractionDigits: 2
      })}
    </Box>
  );
};


export default Badge