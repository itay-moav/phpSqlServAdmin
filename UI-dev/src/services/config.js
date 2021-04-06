/**
 * These values should come from environment
 */
const env = {
    logHandler: "CONSOLE",
    logVerbosity: process.env.REACT_APP_LOG_LEVEL,
    apiBaseUrl: process.env.REACT_APP_API_ENDPOINT,
    jwtStorageKey: process.env.REACT_APP_STORAGE_TOKEN_NAME
};

export default env;