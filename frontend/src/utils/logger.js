export const logClientEvent = (type, payload = {}) => {
    if (import.meta.env.DEV) {
        console.log("[MahasigMind]", { type, timestamp: new Date().toISOString(), ...payload });
    }
};
