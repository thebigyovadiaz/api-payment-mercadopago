import log4js from 'log4js'

const configLogger = (scopeLog, levelLog) => {
  const logger = log4js.getLogger(scopeLog);
  logger.level = levelLog;

  return logger;
}

const getLoggerHandler = (scopeLog, levelLog, messageLog) => {
  const newScopeLog = `["API-PAYMENT-MERCADOPAGO"] ${scopeLog}`
  const logger = configLogger(newScopeLog, `${levelLog.toLowerCase()}`);
  return logger[`${levelLog.toLowerCase()}`](messageLog);
}

export default getLoggerHandler
