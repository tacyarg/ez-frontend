export default {
    initialize(state, initialized) {
        return {
            ...state,
            initialized
        };
    },
    auth(state,{tokenid,userid}){
      window.localStorage.setItem('tokenid',tokenid)
      return {
        ...state,
        tokenid,
        userid,
      }
    },
    tick(state, time) {
        // state.time = Date.now()
        // return state
        return {
            ...state,
            time: Date.now()
        };
    },
    sendChatMessage(state, message) {
        console.log("sendChatMessage", state, message);

        message = {
            image:
                "https://steamcdn-a.opskins.media/steamcommunity/public/images/avatars/f2/f20f3036e3182ce5c31b33e512dfdd3251b47d33_full.jpg",
            username: "tacyarg",
            rank: 1,
            message
        };

        return {
            ...state,
            chat: {
                ...state.chat,
                messages: [...state.chat.messages, message]
            }
        };
    },
    updateChannelState(channel, channelState) {
        return {
            ...state,
            [channel]: channelState
        }
    }
}
