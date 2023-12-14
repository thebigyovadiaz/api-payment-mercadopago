import getLoggerHandler from '../handlers/logger.handler.js'


const healthcheck = (req, res) => {
  getLoggerHandler("[HEALTHCHECK-CONTROLLER]", "DEBUG", "Checking HEALTHCHECK");
  return res.status(200).json({ status: 'UP' });
};

export default healthcheck;
