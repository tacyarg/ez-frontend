import fake from "../fake";

export default {
    initialized: false,
    time: Date.now(),
    user: null,
    token: null,
    online: 69,
    chat: {
        id: "en",
        messages: fake.messages()
    },
    inventory: fake.inventory(),
    jackpot: fake.jackpot()
}