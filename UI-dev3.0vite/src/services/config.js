/**
 * These values should come from environment
 */
const env = {
    logHandler: "CONSOLE",
    logVerbosity: process.env.VITE_REACT_APP_LOG_LEVEL,
    apiBaseUrl: process.env.VITE_REACT_APP_API_ENDPOINT
};

export default env;