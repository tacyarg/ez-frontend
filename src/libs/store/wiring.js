import React from "react";
import Wiring from "react-wiring";

import reducers from './reducers'
import defaults from './defaults'

const wiring = Wiring(React, defaults, reducers);
// let {Provider,dispatch,connect} = wiring

// tick time
setInterval(function () {
  wiring.dispatch("tick")();
}, 1000);

function isEqual(prev, next) {
  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);
  if (prevKeys.length !== nextKeys.length) return false;
  // console.log(prev, next)
  return nextKeys.every(key => {
    // console.log(key, prev[key] === next[key])
    return prev[key] === next[key];
  });
}

wiring.connectMemo = (component, map) => {
  return wiring.connect(React.memo(component, isEqual), map);
};

return wiring