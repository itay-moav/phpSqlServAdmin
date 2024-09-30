let logFunction = NaN;
let logLevel    = 0;

const LEVEL = {
  DEBUG: 4,
  INFO:  3,
  WARNING: 2,
  ERROR: 1,
  FATAL: 0
};

const HANDLER = {
  CONSOLE: (...someMixedValues) => {
    console.log(...someMixedValues);
  }
};

function setLogLevel(log_level){
  logLevel = log_level;
}

function setLogHandler(logHandler){
  logFunction = HANDLER[logHandler];
}

/**
 * Either going by log level, or in case emergency flag, log EVERYTHING to console.
 */
function logger(message_log_level,...someMixedValues) {
  //TODO this is a debug button users can press to help us debug their side, future, const env_log_level = localStorage.getItem('bhDebugLevel');
  if(logLevel <= message_log_level){
    logFunction(...someMixedValues);
  }
}

function debug(...someMixedValues){
  logger(LEVEL.DEBUG,...someMixedValues);
}

function info(...someMixedValues){
  logger(LEVEL.INFO,...someMixedValues);
}

function warning(...someMixedValues){
  logger(LEVEL.WARNING,...someMixedValues);
}

function error(...someMixedValues){
  logger(LEVEL.ERROR,...someMixedValues);
}

function fatal(...someMixedValues){
  logger(LEVEL.FATAL,...someMixedValues);
}

const log = {
  LEVEL,
  HANDLER,
  setLogHandler,
  setLogLevel,
  debug,
  info,
  warning,
  error,
  fatal
};

export default log;
