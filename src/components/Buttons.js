import React, { useState } from "react";

import { Button } from "../primitives";
import Wiring from "../libs/wiring";

const Login = Wiring.connectMemo(
    p => {
        const click = () => {
            const url = `${p.AUTH_URL}/opskins/auth?access_token=${p.tokenid}`;
            // const url = `${process.env.AUTH_URL}/steam/auth?access_token=${token}`
            window.location.replace(url);
        };

        return (
            <Button mx={2} type="primary" onClick={click}>
                Login WAX
      </Button>
        );
    },
    ({ env, tokenid, ...props }) => {
        return { AUTH_URL: env.AUTH_URL };
    }
);

export { Login };
