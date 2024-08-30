/**
 * These values should come from environment
 */
const env = {
    logHandler: import.meta.env.VITE_REACT_APP_LOG_HANDLER,
    logVerbosity: import.meta.env.VITE_REACT_APP_LOG_LEVEL,
    apiBaseUrl: import.meta.env.VITE_REACT_APP_API_ENDPOINT
};

export default env;